pipeline {
    agent any

    stages {

        stage('Install Dependencies & Test') {
            agent {
                docker {
                    image 'node:20'
                    args '-u root'
                }
            }

            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }



        stage('Build Docker Image') {
            steps {
                sh 'docker build -t devops-api .'
            }
        }

    }
}