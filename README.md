# ts-vigil-sensors

This project contains the source code of my lambda functions(`/aws/lambdas`) as well as my sensor code. The sensor code consists of a react project (`/public`) to replicate data given to the cloud such as heart-rate, temperature and whether user has fell. The sensor code also consists of a simple socket server (`/src`), which acts as the middleman between the website and the cloud. I wanted to use amplify instead of the socket middleman, but without the permissions on my school aws account, I cannot do that which led to this implementation.

## To run the project
```cmd
$ .\run.bat
```