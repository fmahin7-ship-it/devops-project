pipeline {

    agent {
        docker {
            image 'node:20'
            args '-u root'
        }
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

        stage('Code Validation') {
            steps {
                sh 'npm audit || true'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                sh 'echo "Application build completed successfully"'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-api .'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker rm -f devops-container || true
                docker run -d -p 3000:3000 --name devops-container devops-api
                '''
            }
        }
    }
}