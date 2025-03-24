FROM codercom/code-server:4.96.4

USER root

RUN apt-get update \
    && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create and set permissions for workspace
RUN mkdir -p /workspace && chown -R coder:coder /workspace

USER coder

EXPOSE 8080

# Use the workspace directory
CMD [ "code-server", "--auth", "none", "--bind-addr", "0.0.0.0:8080", "/workspace"]

# Add a VOLUME instruction
VOLUME [ "/workspace" ]