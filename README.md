# nodejs-book
 Node.js 교과서 실습

## NodeBird 이슈

NodeBird 실습 중 mariasql 설치 에러 때문에 중단

- https://github.com/nodejs/node-gyp/issues/1403

결국 MySQL로 다시 설치했다. 재설치하던 과중 다음 이슈가 있었다.

https://gist.github.com/devheedoo/23974ab13bb75bd991920599db2d73cd

책에서는 MySQL5.7을 쓰는데 MySQL8을 설치해서 ORM 연동 중 암호화 방식 관련 이슈가 있었다.

- https://gist.github.com/devheedoo/6fc8f7b2c162b7f082d8622f7a6e83a2

DB까지 잘 연동됐는데 자꾸 User.find 함수에 오류가 발생해서 알아보니 Sequelize 버전 관련 이슈였다.

https://gist.github.com/devheedoo/83624a78caf9be976eff379d8a106085
