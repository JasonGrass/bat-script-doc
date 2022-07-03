# 第七章 DOS 编程高级技巧

本章节乃龙卷风根据自己平时学用批处理的经验而总结的， 不断补充中……

## 一、交互界面设计

没啥说的，看看高手设计的菜单界面吧：

```bat
@echo off
cls
title 终极多功能修复
:menu
cls
color 0A
echo.
echo ==============================
echo 请选择要进行的操作，然后按回车
echo ==============================
echo.
echo 1.网络修复及上网相关设置,修复 IE,自定义屏蔽网站
echo.
echo 2.病毒专杀工具，端口关闭工具,关闭自动播放
echo.
echo 3.清除所有多余的自启动项目，修复系统错误
echo.
echo 4.清理系统垃圾,提高启动速度
echo.
echo Q.退出
echo.
echo.
:cho
set choice=
set /p choice= 请选择:
IF NOT "%choice%"=="" SET choice=%choice:~0,1%
if /i "%choice%"=="1" goto ip
if /i "%choice%"=="2" goto setsave
if /i "%choice%"=="3" goto kaiji
if /i "%choice%"=="4" goto clean
if /i "%choice%"=="Q" goto endd
echo 选择无效，请重新输入
echo.
goto cho
```

只要学完本教程前面的章节，上面的程序应该能看懂了。

## 二、 if...else... 条件语句

前面已经谈到， DOS 条件语句主要有以下形式

IF [NOT] ERRORLEVEL number command  
IF [NOT] string1==string2 command  
IF [NOT] EXIST filename command  

增强用法： IF [/I] string1 compare-op string2 command  

增强用法中加上/I 就不区分大小写了!  
增强用法中还有一些用来判断数字的符号：  

EQU - 等于  
NEQ - 不等于  
LSS - 小于  
LEQ - 小于或等于  
GTR - 大于  
GEQ - 大于或等于  

上面的 command 命令都可以用小括号来使用多条命令的组合，包括 else 子句，组合命令中可以嵌套使用条件或循环命令。

例如:

```bat
IF EXIST filename (
del filename
) ELSE (
echo filename missing
)
```

也可写成：

if exist filename (del filename) else (echo filename missing)

但这种写法不适合命令太多或嵌套命令的使用。

## 三、循环语句

### 1、指定次数循环

FOR /L %variable IN (start,step,end) DO command [command-parameters]

组合命令：

FOR /L %variable IN (start,step,end) DO (  
Command1  
Command2  
……  
)  

## 2、对某集合执行循环语句

FOR %%variable IN (set) DO command [command-parameters]

%%variable 指定一个单一字母可替换的参数。  
(set) 指定一个或一组文件。可以使用通配符。  
command 对每个文件执行的命令，可用小括号使用多条命令组合。  

FOR /R [[drive:]path] %variable IN (set) DO command [command-parameters]

检查以 [drive:]path 为根的目录树，指向每个目录中的FOR 语句。如果在 /R 后没有指定目录，则使用当前目录。
如果集仅为一个单点(.)字符，则枚举该目录树。
同前面一样， command 可以用括号来组合：

FOR /R [[drive:]path] %variable IN (set) DO (  
Command1  
Command2  
……  
commandn  
)  

### 3、条件循环

利用 goto 语句和条件判断， dos 可以实现条件循环，很简单啦，看例子：

```bat
@echo off
set var=0
rem ************循环开始了
:continue
set /a var+=1
echo 第%var%此循环
if %var% lss 100 goto continue
rem ************循环结束了
echo 循环执行完毕
pause
```

## 四、子程序

在批处理程序中可以调用外部可运行程序，比如 exe 程序，也可调用其他批处理程序，这些也可以看作子程序，但是不够方便，如果被调用的程序很多，就显得不够简明了，很繁琐。

在 windowsXP 中，批处理可以调用本程序中的一个程序段，相当于子程序，这些子程序一般放在主程序后面。

子程序调用格式：

CALL :label arguments

子程序语法：

```bat
:label
command1
command2
...
commandn
goto :eof
```

传至子程序的参数在 call 语句中指定，在子程序中用%1、 %2 至%9 的形式调用，而子程序返回主程序的数据只需在调用结束后直接引用就可以了，当然也可以指定返回变量，请看下面的例子。

子程序例 1：

```bat
@echo off
call :sub return 你好
echo 子程序返回值： %return%
pause
:sub
set %1=%2
goto :eof
```

运行结果：你好

子程序例 2：设计一个求多个整数相加的子程序

```bat
@echo off
set sum=0
call :sub sum 10 20 35
echo 数据求和结果： %sum%
pause
:sub
rem 参数 1 为返回变量名称
set /a %1=%1+%2
shift /2
if not "%2"=="" goto sub
goto :eof
```

运行结果： 65

在 win98 系统中，不支持上面这种标号调用，须将子程序单独保存为一个批处理程序，然后调用。

## 五、用 ftp 命令实现自动下载

ftp 是常用的下载工具， ftp 界面中有 40 多个常用命令，自己学习了，不介绍了。这里介绍
如何用 dos 命令行调用 ftp 命令，实现 ftp 自动登录，并上传下载，并自动退出 ftp 程序。
其实可以将 ftp 命令组合保存为一个文本文件，然后用以下命令调用即可。

ftp -n -s:[[drive:]path]filename

上面的 filename 为 ftp 命令文件，包括登录 IP 地址，用户名、密码、操作命令等
例：

``` text
open 90.52.8.3 #打开 ip
user iware #用户为 iware
password8848 #密码
bin #二进制传输模式
prompt
cd tmp1 #切换至 iware 用户下的 tmp1 目录
pwd
lcd d:\download ＃本地目录
mget * #下载 tmp1 目录下的所有文件
bye #退出 ftp
```

## 六、用 7-ZIP 实现命令行压缩和解压功能

语法格式：（详细情况见 7-zip 帮助文件，看得头晕可以跳过，用到再学）

`7z <command> [<switch>...] <base_archive_name> [<arguments>...]`

7z.exe 的每个命令都有不同的参数 `<switch>`, 请看帮助文件  
`<base_archive_name>` 为压缩包名称  
`<arguments>` 为文件名称，支持通配符或文件列表  

其中， 7z 是至命令行压缩解压程序 7z.exe， `<command>` 是 7z.exe 包含的命令，列举如下：  

```text

a： Adds files to archive. 添加至压缩包  
a 命令可用参数：  
-i (Include)
-m (Method)
-p (Set Password)
-r (Recurse)
-sfx (create SFX)
-si (use StdIn)
-so (use StdOut)
-ssw (Compress shared files)
-t (Type of archive)
-u (Update)
-v (Volumes)
-w (Working Dir)
-x (Exclude)
b： Benchmark
d： Deletes files from archive. 从压缩包中删除文件
d 命令可用参数：
-i (Include)
-m (Method)
-p (Set Password)
-r (Recurse)
-u (Update)
-w (Working Dir)
-x (Exclude)
e： Extract 解压文件至当前目录或指定目录
e 命令可用参数：
-ai (Include archives)
-an (Disable parsing of archive_name)
-ao (Overwrite mode)
-ax (Exclude archives)
-i (Include)
-o (Set Output Directory)
-p (Set Password)
-r (Recurse)
-so (use StdOut)-x (Exclude)
-y (Assume Yes on all queries)
l： Lists contents of archive.
t： Test
u： Update
x： eXtract with full paths 用文件的完整路径解压至当前目录或指定目录
x 命令可用参数：
-ai (Include archives)
-an (Disable parsing of archive_name)
-ao (Overwrite mode)
-ax (Exclude archives)
-i (Include)
-o (Set Output Directory)
-p (Set Password)
-r (Recurse)
-so (use StdOut)
-x (Exclude)
-y (Assume Yes on all queries)
```

## 七、调用 VBScript 程序

使用 Windows 脚本宿主，可以在命令提示符下运行脚本。 CScript.exe 提供了用于设置脚本
属性的命令行开关。

用法： CScript 脚本名称 [脚本选项...] [脚本参数...]

选项：

```text
//B 批模式：不显示脚本错误及提示信息
//D 启用 Active Debugging
//E:engine 使用执行脚本的引擎
//H:CScript 将默认的脚本宿主改为 CScript.exe
//H:WScript 将默认的脚本宿主改为 WScript.exe （默认）
//I 交互模式（默认，与 //B 相对)
//Job:xxxx 执行一个 WSF 工作
//Logo 显示徽标（默认）
//Nologo 不显示徽标：执行时不显示标志
//S 为该用户保存当前命令行选项
//T:nn 超时设定秒：允许脚本运行的最长时间
//X 在调试器中执行脚本
//U 用 Unicode 表示来自控制台的重定向 I/O
```

“ 脚 本 名 称 ” 是 带 有 扩 展 名 和 必 需 的 路 径 信 息 的 脚 本 文 件 名 称 ， 如
d:\admin\vbscripts\chart.vbs。

“脚本选项和参数”将传递给脚本。脚本参数前面有一个斜杠 (/)。每个参数都是可选的；
但不能在未指定脚本名称的情况下指定脚本选项。如果未指定参数，则 CScript 将显示 CScript 语法和有效的宿主参数。

## 八、将批处理转化为可执行文件

由于批处理文件是一种文本文件，任何人都可以对其进行随便编辑，不小心就会把里面的命
令破坏掉，所以如果将其转换成.com 格式的可执行文件，不仅执行效率会大大提高，而且
不会破坏原来的功能，更能将优先级提到最高。 Bat2Com 就可以完成这个转换工作。
小知识：在 DOS 环境下，可执行文件的优先级由高到低依次为.com>.exe>.bat>.cmd，即如
果在同一目录下存在文件名相同的这四类文件，当只键入文件名时， DOS 执行的是
name.com，如果需要执行其他三个文件，则必须指定文件的全名，如 name.bat。
这是一个只有 5.43K 大小的免费绿色工具，可以运行在纯 DOS 或 DOS 窗口的命令行中，用
法： Bat2Com
FileName，这样就会在同一目录下生成一个名为 FileNme.com 的可执行文件，执行的效果和
原来的.bat 文件一样。

## 九、时间延迟

本条引用[英雄]教程
什么是时间延迟？顾名思义，就是执行一条命令后延迟一段时间再进行下一条命令。

### 1、利用 ping 命令延时

例：
@echo off
echo 延时前！
ping /n 3 127.0.0.1 >nul
echo 延时后！
pause
解说：用到了 ping 命令的“/n”参数，表示要发送多少次请求到指定的 ip。本例中要发送 3
次请求到本机的 ip
（127.0.0.1）。 127.0.0.1 可简写为 127.1。“>nul”就是屏蔽掉 ping 命令所显示的内容。

### 2、利用 for 命令延时

例：
@echo off
echo 延时前！
for /l %%i in (1,1,5000) do echo %%i>nulecho 延时后！
pause
解说：原理很简单，就是利用一个计次循环并屏蔽它所显示的内容来达到延时的目的。

## 十、模拟进度条

下面给出一个模拟进度条的程序。如果将它运用在你自己的程序中，可以使你的程序更漂亮。
```bat
@echo off
mode con cols=113 lines=15 &color 9f
cls
echo.
echo 程序正在初始化. . .
echo.
echo ┌──────────────────────────────────────┐
set /p= ■<nul
for /L %%i in (1 1 38) do set /p a=■<nul & ping /n 1 127.0.0.1>nul
echo 100%%
echo └──────────────────────────────────────┘
pause
```

解说：`set /p a=■<nul` 的意思是：只显示提示信息“■”且不换行，也不需手工输入任何信息，这样可以使每个“■”在同一行逐个输出。

`ping /n 0 127.1>nul` 是输出每个“■”的时间间隔，即每隔多少时间输出一个“■”。
