pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node:20'
                    args '-u root'
                }
            }
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
            agent {
                docker {
                    image 'node:20'
                    args '-u root'
                }
            }
            steps {
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            agent {
                docker {
                    image 'node:20'
                    args '-u root'
                }
            }
            steps {
                sh 'npx eslint . || true'
            }
        }

        stage('Security') {
            agent {
                docker {
                    image 'node:20'
                    args '-u root'
                }
            }
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
                echo "Release version v1.0 created successfully"
                docker images | grep devops-api
                '''
            }
        }

        stage('Monitoring') {
            steps {
                sh '''
                sleep 10

                echo "===== Running Containers ====="
                docker ps

                echo "===== Application Health Check ====="
                curl http://localhost:3000/products
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully.'
        }

        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}