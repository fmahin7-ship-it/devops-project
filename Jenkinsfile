pipeline {
    agent {
        docker {
            image 'node:20'
            args '-u root'
        }
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }



        stage('Run Tests') {
            steps {
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