# evtest

> An electron-vue project

[git地址](https://github.com/LJLCarrien/evtest.git)

## 创建

### 模板下载

cnpm install simulatedgreg/electron-vue --save-dev

### 创建项目
vue init simulatedgreg/electron-vue evtest



## 打包报错



### 报错1：下载electron-v2.0.18-win32-x64.zip失败
    • packaging       platform=win32 arch=x64 electron=2.0.18 appOutDir=dist\win-unpacked
    ⨯ Get https://github-production-release-asset-2e65be.s3.amazonaws.com/9384267/f13b4480-40f1-11e9-80a2-98c8cb857dae?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20200109%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200109T080435Z&X-Amz-Expires=300&X-Amz-Signature=7c5d21eaf06c8caadbd1db98ae0e3106c1d1d13e8a811936f744cd9ab503a6f0&X-Amz-SignedHeaders=host&actor_id=0&response-content-disposition=attachment%3B%20filename%3Delectron-v2.0.18-win32-x64.zip&response-content-type=application%2Foctet-stream: EOF
解决：设置淘宝镜像

npm set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/



### 报错2：下载nsis-resources-3.3.0.7z失败

```cmd
• downloading     parts=1 size=1.0 MB url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.3.0/nsis-resources-3.3.0.7z  
• retrying (1)
• retrying (2)
• retrying (3)
⨯ part download request failed with status code 403
```
解决：手动下载，解压到%LOCALAPPDATA%\electron-builder\cache目录下

> 解压到：%LOCALAPPDATA%\electron-builder\cache\nsis\nsis-resources-3.3.0

### 报错3：下载nsis-3.0.3.2.7z失败
```cmd
• downloading     parts=1 size=1.4 MB url=https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.3.2/nsis-3.0.3.2.7z
• retrying (1)
• retrying (2)
• retrying (3)
⨯ part download request failed with status code 403    
```

解决：手动下载，解压到%LOCALAPPDATA%\electron-builder\cache目录下

    解压到：%LOCALAPPDATA%\electron-builder\cache\nsis\nsis-3.0.1.13

> 总之就是下载什么文件失败，就手动下载，解压。
> %LOCALAPPDATA%路径的最终效果：
> |--electron
>
> ​	|--Cache
>
> ​	|--electron-v1.8.2-win32-x64.zip
>
> ​	|--SHASUMS256.txt-1.8.2
> |--electron-builder
>
> ​	|--cache
>
> ​		|--app-builder
>
> ​			| --app-builder-v0.6.1-x64
>
> ​				|--解压app-builder-v0.6.1-x64.7z所得文件
>
> ​		|--nsis
>
> ​			|--nsis-3.0.1.13
>
> ​				|-- 解压nsis-3.0.1.13.7z所得文件
>
> ​			|--nsis-resources-3.3.0
> ​                解压nsis-resources-3.3.0.7z所得文件
>
> ​		|--winCodeSign
>
> ​			|--winCodeSign-1.9.0
>
> ​			|-- 解压winCodeSign-1.9.0.7z所得文件

