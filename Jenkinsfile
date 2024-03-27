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
                    withSonarQubeEnv(credentialsId:'sonar-token', installationName: 'Sonar Scanner') {
                        sh """
                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=server \
                            -Dsonar.projectName=server \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=http://localhost:9000 \
                            -Dsonar.token=sqa_e8c45246f19974dccc1dd8b0c3e634caa2980581 \
                            -Dsonar.nodejs.executable=/usr/local/bin/node \
                            -Dsonar.javascript.node.maxspace=4096 \
                            -Dsonar.javascript.node.recycle=false \
                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }
    }
}
