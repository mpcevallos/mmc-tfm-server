pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', credentialsId: 'git-threepoints-github', url: 'https://github.com/mpcevallos/mmc-tfm-server'
            }
        }

        stage('Análisis estático de código fuente con SonarQube') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv(credentialsId:'sonar-token') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=server \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://localhost:9000 \
                            -Dsonar.token=sqp_185bc4a1f756cccf3d2afc6ef6ef02171d77ce54
                        """
                    }
                    timeout(time: 2, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: false
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline exitoso'
        }
        failure {
            echo 'Pipeline fallido'
        }
    }
}