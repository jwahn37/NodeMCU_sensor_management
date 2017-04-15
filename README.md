READ ME 

nodemcu의 온도센서로 부터 1분단위로 정보를 읽어와 서버에서 DB로 관리하는 프로그램이다.

1. nodemcu 의 온도센서 정보는 thingspeak 으로 전달되어 그래프로 출력된다.
URL : https://thingspeak.com/channels/255363

2. nodemcu 의 온도센서 정보는 서버로 전송되어 mysql 에 저장된다. 해당 mysql 정보를 웹브라우저상에서 확인할 수 있다.
URL : http://163.239.78.88:8000/dump

3. 해당 프로그램의 데모영상은 다음에서 확인할 수 있다.
URL :  https://youtu.be/NtnYYunFSqo 

4.  프로그램 실행방법

a. server에서는 server 디렉토리 내에서 cmd창에 node app.js를 입력하여 서버를 실행시킨다.

b. 온도센서가 연결된 노드 mcu를 컴퓨터에 연결하고 아두이노 IDE를 이용하여 nodeMCU 디렉토리 내 sketch_mar24c.ino을 실행한다.

c. 1분단위로 노드 mcu를 통해 읽어온 온도 값은 서버로 전송되어 db에 저장되고, thingspeak 으로 전송되어 그래프를 출력하게 된다.
