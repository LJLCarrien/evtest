// testDll.cpp : 定义 DLL 的导出函数。
//

#include "testDll.h"

// 这是导出函数的一个示例。
TESTDLL_API int fntestDll(void)
{
    return 0;
}

TESTDLL_API double Add(double a, double b) {
	return a + b;
}

// 这是已导出类的构造函数。
CtestDll::CtestDll()
{
    return;
}


TESTDLL_API int foo(int value)
{
	return value;
}