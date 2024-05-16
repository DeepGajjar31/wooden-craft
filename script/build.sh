docker login -u deep1238 -p Deep@1238

docker build -t woodencraft .

docker tag woodencraft deep1238/wooden-craft-app

docker push deep1238/wooden-craft-app