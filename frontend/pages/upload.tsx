import React from "react";
import Head from "next/head";
import { Fragment, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  ArrowUpIcon,
  Bars3Icon,
  PhotoIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Image from "next/image";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useAccount } from "wagmi";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const people = [
  { id: 1, name: "Sora" },
  { id: 2, name: "DallE" },
  { id: 3, name: "ChatGPT" },
  { id: 4, name: "Stable Diffusion" },
  { id: 5, name: "Stability" },
];

const navigation = [
  { name: "Upload", href: "/upload", icon: ArrowUpIcon },
  { name: "Verify", href: "/verify", icon: UsersIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function UploadPage() {
  const router = useRouter();
  const { address } = useAccount();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(people[3]);
  const [file, setFile] = useState<any>();
  const [txhash, setTxhash] = useState<any>();
  const [showTxHash, setShowTxhash] = useState<boolean>(false);

  const descriptionRef = React.useRef<any>("");

  function handleFileUpload(event: any) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Submitted!", descriptionRef.current?.value, file);

    const url =
      "https://4006-2409-40f4-1e-aaf3-e45e-4c6-5ac5-741a.ngrok-free.app/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    address && formData.append("address", address);
    formData.append("claimGenerator", selected.name);
    formData.append("description", descriptionRef.current?.value);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        return response; // Add this line to pass the response data to the next then block
      })
      .then((response) => {
        if (response.data.success) {
          // Update 'response' to 'response.data'
          setTxhash(response.data.transactionHash);
          alert("File uploaded successfully!");
          setShowTxhash(true);
        } else {
          alert("File upload failed!");
          setShowTxhash(false);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Upload - Verificador</title>
        <meta name="title" content="Upload - Verificador" />
      </Head>
      <>
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50 lg:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900/80" />
              </Transition.Child>

              <div className="fixed inset-0 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                        <button
                          type="button"
                          className="-m-2.5 p-2.5"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                      <div className="flex h-16 shrink-0 items-center gap-x-2">
                        <Image
                          className="h-8 w-auto"
                          width={96}
                          height={96}
                          src="/logo.png"
                          alt="Verificador"
                        />
                        <span className="text-white text-2xl font-black">
                          Verificador
                        </span>
                      </div>
                      <nav className="flex flex-1 flex-col">
                        <ul
                          role="list"
                          className="flex flex-1 flex-col gap-y-7"
                        >
                          <li>
                            <ul role="list" className="-mx-2 space-y-1">
                              {navigation.map((item) => (
                                <li key={item.name}>
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      item.href.split("/")[3] ===
                                        router.pathname.split("/")[1]
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <item.icon
                                      className="h-6 w-6 shrink-0"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
              <div className="flex h-16 shrink-0 items-center gap-x-2">
                <Image
                  className="h-8 w-auto"
                  width={96}
                  height={96}
                  src="/logo.png"
                  alt="Your Company"
                />
                <span className="text-white text-2xl font-black">
                  Verificador
                </span>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.href.split("/")[1] ===
                                router.pathname.split("/")[1]
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 text-sm font-semibold leading-6 text-white">
              Dashboard
            </div>
          </div>

          <main className="min-h-screen bg-gray-100 py-10 lg:pl-72">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6 bg-white px-4 py-6 sm:p-6">
                    <div>
                      <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Upload
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Upload a file here to add a C2PA address to it.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <Listbox value={selected} onChange={setSelected}>
                          {({ open }) => (
                            <>
                              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                                Generated by
                              </Listbox.Label>
                              <div className="relative mt-2">
                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                  <span className="block truncate">
                                    {selected.name}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {people.map((person) => (
                                      <Listbox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                          classNames(
                                            active
                                              ? "bg-indigo-600 text-white"
                                              : "text-gray-900",
                                            "relative cursor-default select-none py-2 pl-3 pr-9"
                                          )
                                        }
                                        value={person}
                                      >
                                        {({ selected, active }) => (
                                          <>
                                            <span
                                              className={classNames(
                                                selected
                                                  ? "font-semibold"
                                                  : "font-normal",
                                                "block truncate"
                                              )}
                                            >
                                              {person.name}
                                            </span>

                                            {selected ? (
                                              <span
                                                className={classNames(
                                                  active
                                                    ? "text-white"
                                                    : "text-indigo-600",
                                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                                )}
                                              >
                                                <CheckIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </>
                          )}
                        </Listbox>
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Description
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="about"
                            name="about"
                            rows={3}
                            ref={descriptionRef}
                            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Crowned Monkeys Smoking Pot is a painting by Salvador Dalí. It was painted in 1940 and is currently housed in the Musée National d'Art Moderne in Paris."
                            defaultValue={""}
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile. URLs are
                          hyperlinked.
                        </p>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="cover-photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Media
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <PhotoIcon
                              className="mx-auto h-12 w-12 text-gray-300"
                              aria-hidden="true"
                            />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  onChange={handleFileUpload}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>

                      {showTxHash && (
                        <div className="col-span-full rounded-md bg-blue-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <InformationCircleIcon
                                className="h-5 w-5 text-blue-400"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="ml-3 flex-1 md:flex md:justify-between">
                              <p className="text-sm text-blue-700">
                                Your metadata has been successfully written to
                                chain.
                              </p>
                              <p className="mt-3 text-sm md:ml-6 md:mt-0">
                                <a
                                  href={`https://sepolia.arbiscan.io/tx/${txhash}`}
                                  className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                                >
                                  Details
                                  <span aria-hidden="true"> &rarr;</span>
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Upload
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </>
    </>
  );
}
export default UploadPage;
