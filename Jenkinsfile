pipeline {
    agent any

    tools {
        nodejs 'NodeJS20'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t devops-api .'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                sh 'npx eslint . || true'
            }
        }

        stage('Security') {
            steps {
                sh 'npm audit || true'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker rm -f devops-container || true
                docker run -d -p 3000:3000 --name devops-container devops-api
                '''
            }
        }

        stage('Release') {
            steps {
                sh '''
                docker tag devops-api devops-api:v1.0
                '''
            }
        }

        stage('Monitoring') {
            steps {
                sh '''
                sleep 10
                curl -f http://localhost:3000/products
                '''
            }
        }
    }
}