// ConsoleApplication1.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>
//#include <nanomsg/nn.h>
//#include <nanomsg/reqrep.h>
#include "nn.h"
#include "reqrep.h"
//#pragma comment(lib,"nanomsg.lib")

using namespace std;

int main() {
	printf("wait next \n");
	int s = nn_socket(AF_SP, NN_REP);
	int err = nn_errno();
	int rc = nn_bind(s, "tcp://0.0.0.0:12345");
	char buf[1000] = { 0 };
	for (;;) {
		printf("wait next \n");
		
		int rc = nn_recv(s, buf, 1000, 0);
		if (rc < 0) {
			printf("error: %s\n", nn_strerror(nn_errno()));
		}
		printf("%s\n", buf);
	}
	return 0;
}
