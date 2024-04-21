#!/bin/bash
if python3 --version ; then
    echo "python3 is installed"
elif python --version ; then
    echo "python2 is installed"
else
    echo "python is not installed"
    exit 1
fi


## Set minimum required versions
#PYTHON_MINIMUM_MAJOR=3
#PYTHON_MINIMUM_MINOR=6
#
## Get python references
#PYTHON3_REF=$(which python3 | grep "/python3")
#PYTHON_REF=$(which python | grep "/python")
#
#error_msg(){
#    echo "NoPython"
#}
#
#python_ref(){
#    local my_ref=$1
#    echo $($my_ref -c 'import platform; major, minor, patch = platform.python_version_tuple(); print(major); print(minor);')
#}
#
## Print success_msg/error_msg according to the provided minimum required versions
#check_version(){
#    local major=$1
#    local minor=$2
#    local python_ref=$3
#    [[ $major -ge $PYTHON_MINIMUM_MAJOR && $minor -ge $PYTHON_MINIMUM_MINOR ]] && echo $python_ref || error_msg
#}
#
## Logic
#if [[ ! -z $PYTHON3_REF ]]; then
#    version=($(python_ref python3))
#    check_version ${version[0]} ${version[1]} $PYTHON3_REF
#elif [[ ! -z $PYTHON_REF ]]; then
#    # Didn't find python3, let's try python
#    version=($(python_ref python))
#    check_version ${version[0]} ${version[1]} $PYTHON_REF
#else
#    # Python is not installed at all
#    error_msg
#fi

#ver=$(python -c 'import sys; print(sys.version_info.major)')
#if [ $ver -eq 2 ]; then
#    echo "python version 2"
#elif [ $ver -eq 3 ]; then
#    echo "python version 3"
#else
#    echo "Unknown python version: $ver"
#fi
#echo "python version::: " python --version
