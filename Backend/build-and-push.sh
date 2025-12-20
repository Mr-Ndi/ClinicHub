#!/bin/bash

# Docker Hub configuration
# Replace 'YOUR_DOCKERHUB_USERNAME' with your actual Docker Hub username
DOCKERHUB_USERNAME="${DOCKERHUB_USERNAME:-YOUR_DOCKERHUB_USERNAME}"
IMAGE_NAME="clinichub-backend"
VERSION="${VERSION:-latest}"

# Full image name
FULL_IMAGE_NAME="${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${VERSION}"

echo "🐳 Building Docker image: ${FULL_IMAGE_NAME}"

# Build the Docker image
docker build -t ${FULL_IMAGE_NAME} .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    
    # Also tag as latest
    docker tag ${FULL_IMAGE_NAME} ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
    
    echo ""
    echo "📦 Image tags created:"
    echo "   - ${FULL_IMAGE_NAME}"
    echo "   - ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
    echo ""
    echo "🚀 To push to Docker Hub, run:"
    echo "   docker login"
    echo "   docker push ${FULL_IMAGE_NAME}"
    echo "   docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
    echo ""
    echo "Or run this script with PUSH=true:"
    echo "   PUSH=true DOCKERHUB_USERNAME=yourusername ./build-and-push.sh"
    
    # Push if PUSH environment variable is set
    if [ "${PUSH}" = "true" ]; then
        echo ""
        echo "📤 Pushing to Docker Hub..."
        docker push ${FULL_IMAGE_NAME}
        docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest
        echo "✅ Images pushed successfully!"
    fi
else
    echo "❌ Docker build failed!"
    exit 1
fi

