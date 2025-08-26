pipeline {
  agent any
  stages {
    stage('Install') {
      steps {
        sh 'pnpm install'
      }
    }
    stage('Build') {
      steps {
        sh 'pnpm -r build'
      }
    }
    stage('Test') {
      steps {
        sh 'pnpm -r test'
      }
    }
    stage('Docker Build') {
      steps {
        sh 'docker-compose -f infra/docker-compose.dev.yml build'
      }
    }
  }
}
