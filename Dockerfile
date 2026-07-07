FROM python:3.12-slim

RUN apt-get update && apt-get install -y ffmpeg curl xz-utils && rm -rf /var/lib/apt/lists/* \
    && NODE_ARCH=$(uname -m | sed 's/aarch64/arm64/;s/x86_64/x64/') \
    && curl -fsSL "https://nodejs.org/dist/v22.14.0/node-v22.14.0-linux-${NODE_ARCH}.tar.xz" | tar -xJ -C /usr/local --strip-components=1 \
    && ln -sf /usr/local/bin/node /usr/bin/node

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p downloads cookies

EXPOSE 8080

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080", "--log-level", "info"]
