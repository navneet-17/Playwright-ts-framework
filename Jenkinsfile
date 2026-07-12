pipeline {
    agent any

    tools {
        nodejs 'NodeJS 24.13.0'   // must exactly match the name in Manage Jenkins → Tools
    }

    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'api', 'smoke', 'regression', 'api-smoke', 'api-regression'],
            description: 'Select which test suite to run'
        )
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/navneet-17/Playwright-ts-framework.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm ci'
                bat 'call npx playwright install --with-deps'
            }
        }

        stage('Inject Secrets') {
            steps {
                withCredentials([file(credentialsId: 'playwright-env-file', variable: 'ENV_FILE')]) {
                    bat 'copy /Y "%ENV_FILE%" ".env"'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def testCmd = 'npx playwright test'
                    if (params.TEST_SUITE == 'api')             { testCmd = 'npx playwright test src/tests/api_tests' }
                    if (params.TEST_SUITE == 'smoke')            { testCmd = 'npx playwright test --grep @smoke' }
                    if (params.TEST_SUITE == 'regression')       { testCmd = 'npx playwright test --grep @regression' }
                    if (params.TEST_SUITE == 'api-smoke')        { testCmd = 'npx playwright test src/tests/api_tests --grep @smoke' }
                    if (params.TEST_SUITE == 'api-regression')   { testCmd = 'npx playwright test src/tests/api_tests --grep @regression' }

                    echo "Running command: ${testCmd}"
                    bat "call ${testCmd}"
                }
            }
        }

        stage('Generate Stakeholder Report') {
            steps {
                bat 'node scripts/generate-email-report.js'
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results/results.xml'

            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])

            emailext(
                subject: "Jenkins Build ${currentBuild.currentResult}: ${params.TEST_SUITE} suite - #${env.BUILD_NUMBER}",
                body: '''<h2>Playwright Test Results: ${JOB_NAME} #${BUILD_NUMBER}</h2>
                         <p><b>Suite Run:</b> ${ENV, var="TEST_SUITE"}</p>
                         <p><b>Overall Status:</b> ${BUILD_STATUS}</p>
                         ${FILE,path="test-results/email-summary.html"}
                         <p><b>Full report:</b> <a href="${BUILD_URL}Playwright_20HTML_20Report/">View detailed report</a></p>''',
                to: '$DEFAULT_RECIPIENTS, navneettestemail@gmail.com',
                mimeType: 'text/html'
            )
        }
    }
}