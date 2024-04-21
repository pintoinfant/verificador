FROM node
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN cargo install c2patool

WORKDIR /app
COPY . .
RUN yarn
EXPOSE 5000
CMD ["yarn", "start"]