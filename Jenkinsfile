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
                            -Dsonar.login=sqp_8871e861546564ca35025574380ccc281e056c0c
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