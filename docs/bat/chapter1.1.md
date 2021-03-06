# 第一章 第一节 批处理基础 常用批处理内部命令简介

批处理定义：顾名思义，批处理文件是将一系列命令按一定的顺序集合为一个可执行的文本文件，其扩展名为 BAT 或者 CMD。这些命令统称批处理命令。

小知识：可以在键盘上按下 Ctrl+C 组合键来强行终止一个批处理的执行过程。

了解了大概意思后,我们正式开始学习.先看一个简单的例子!

``` bat
@echo off
echo "欢迎来到非常 BAT!"
pause
```

把上面的 3 条命令保存为文件 test.bat 或者 test.cmd 然后执行,
他就会在屏幕上显示以下二行话:

```text
欢迎来到非常 BAT!
请按任意键继续. . .
```

这就是一个简单批处理文件了，这个批处理文件一共就用了 2 条命令 "echo" 和 "pause" 还有一个特殊符号 "@",

从上面这个简单的批处理中,我们可以发现其实批处理就是运用一些含有特殊意义的符号和一些完成指定功能的命令组合而成,那么在批处理中有多少这样的特殊符号和功能命令呢？

我们现在就来仔细了解一下一些最常用的!

(以下内容来源网络,请各位仔细阅读,好进入下节的实例说明)

======================================================

批处理的常见命令（未列举的命令还比较多，请查阅帮助信息）  
1、 REM 和 ::
2、 ECHO 和 @
3、 PAUSE
4、 ERRORLEVEL
5、 TITLE
6、 COLOR
7、 mode 配置系统设备
8、 GOTO 和 :
9、 FIND
10、 START
11、 assoc 和 ftype
12、 pushd 和 popd
13、 CALL
14、 shift
15、 IF16、 setlocal 与 变量延迟

介绍命令

## 1、 REM 和 `::`

REM 为注释命令，一般用来给程序加上注解，该命令后的内容不被执行，但能回显。
其次, :: 也可以起到 rem 的注释作用, 而且更简洁有效; 但有两点需要注意：

第一, 任何以冒号:开头的字符行, 在批处理中都被视作标号, 而直接忽略其后的所有内容。
有效标号：冒号后紧跟一个以字母数字开头的字符串， goto 语句可以识别。
无效标号：冒号后紧跟一个非字母数字的一个特殊符号， goto 无法识别的标号，可以起到注
释作用，所以 :: 常被用作注释符号，其实 :+ 也可起注释作用。

第二, 与 rem 不同的是, ::后的字符行在执行时不会回显, 无论是否用 echo on 打开命令行回
显状态, 因为命令解释器不认为他是一个有效的命令行, 就此点来看, rem 在某些场合下将
比 :: 更为适用; 另外, rem 可以用于 config.sys 文件中。

## 2、 ECHO 和 @

打开回显或关闭回显功能，或显示消息。如果没有任何参数， echo 命令将显示当前回显设置。
@ 字符放在命令前将关闭该命令回显，无论此时 echo 是否为打开状态。

语法:

``` bat
echo [{ on|off }] [message]
echo. #此用法将显示一空行，相当于回车，非常有用。
```

执行 echo off 将关闭回显，它后面的所有命令都不显示命令本身，只显示执行后的结果，除非执行 echo on 命令。
执行 @echo off 不但关闭以后命令的回显，连 echo off 命令本身也不显示了。

通常以@echo off 作为批处理程序的首行。
一般用 ECHO MESSAGE 来显示一个特定的消息。
例：

``` bat
@Echo off
Echo hello
Pause
```

运行显示： hello

## 3、 PAUSE

PAUSE，玩游戏的人都知道，暂停的意思
在这里就是停止系统命令的执行并显示下面的内容。

例：

``` bat
PAUSE
```

运行显示：请按任意键继续. . .

要显示其他提示语，可以这样用：
Echo 其他提示语 & pause > nul

## 4、 errorlevel

程序返回码

``` bat
echo %errorlevel%
```

每个命令运行结束，可以用这个命令行格式查看返回码
用于判断刚才的命令是否执行成功
默认值为 0，一般命令执行出错会设 errorlevel 为 1

## 5、 title

设置 cmd 窗口的标题

``` bat
title 新标题 #可以看到 cmd 窗口的标题栏变了
```

## 6、 COLOR

设置默认的控制台前景和背景颜色。

``` bat
COLOR [attr]
```

attr 指定控制台输出的颜色属性

颜色属性由两个十六进制数字指定 -- 第一个为背景，第二个则为
前景。每个数字可以为以下任何值之一:

0 = 黑色 8 = 灰色
1 = 蓝色 9 = 淡蓝色
2 = 绿色 A = 淡绿色
3 = 湖蓝色 B = 淡浅绿色
4 = 红色 C = 淡红色
5 = 紫色 D = 淡紫色
6 = 黄色 E = 淡黄色
7 = 白色 F = 亮白色

如果没有给定任何参数，该命令会将颜色还原到 CMD.EXE 启动时的颜色。
这个值来自当前控制台窗口、 /T 开关或DefaultColor 注册表值。

如果用相同的前景和背景颜色来执行 COLOR 命令， COLOR 命令会将 ERRORLEVEL 设置为 1。

例如: "COLOR fc" 在亮白色上产生亮红色

## 7、 mode 配置系统设备

配置系统设备。

串行口:

``` bat
MODE COMm[:] [BAUD=b] [PARITY=p] [DATA=d] [STOP=s]
[to=on|off] [xon=on|off] [odsr=on|off]
[octs=on|off] [dtr=on|off|hs]
[rts=on|off|hs|tg] [idsr=on|off]

```

设备状态: MODE [device] [/STATUS]
打印重定向: MODE LPTn[:]=COMm[:]
选定代码页: MODE CON[:] CP SELECT=yyy
代码页状态: MODE CON[:] CP [/STATUS]
显示模式: MODE CON[:] [COLS=c] [LINES=n]
击键率: MODE CON[:] [RATE=r DELAY=d]

例：

``` bat
mode con cols=113 lines=15 & color 9f
```

此命令设置 DOS 窗口大小： 15 行， 113 列

## 8、 GOTO 和 `:`

GOTO 会点编程的朋友就会知道这是跳转的意思。
在批处理中允许以“:XXX”来构建一个标号，然后用 GOTO XXX 跳转到标号:XXX 处，然后执行标号后的命令。

例：

```bat
if {%1}=={} goto noparms
if "%2"=="" goto noparms
```

标签的名字可以随便起，但是最好是有意义的字符串啦，前加个冒号用来表示这个字符串是
标签， goto 命令就是根据这个冒号（:）来寻找下一步跳到到那里。最好有一些说明这样你
别人看起来才会理解你的意图啊。

例：

``` bat
@echo off
:start
set /a var+=1
echo %var%
if %var% leq 3 GOTO start
pause
```

运行显示：

``` text
1
2
3
4
```

## 9、 find

在文件中搜索字符串。

FIND [/V] [/C] [/N] [/I] [/OFF[LINE]] "string" [[drive:][path]filename[ ...]]
/V 显示所有未包含指定字符串的行。
/C 仅显示包含字符串的行数。
/N 显示行号。
/I 搜索字符串时忽略大小写。
/OFF[LINE] 不要跳过具有脱机属性集的文件。
"string" 指定要搜索的文字串，
[drive:][path]filename

指定要搜索的文件。
如果没有指定路径， FIND 将搜索键入的或者由另一命令产生的文字。

Find 常和 type 命令结合使用

Type [drive:][path]filename | find "string" [>tmpfile] #挑选包含 string 的行
Type [drive:][path]filename | find /v "string" #剔除文件中包含 string 的行
Type [drive:][path]filename | find /c #显示文件行数

以上用法将去除 find 命令自带的提示语（文件名提示）
例：

``` bat
@echo off
echo 111 >test.txt
echo 222 >>test.txt
find "111" test.txt
del test.txt
pause
```

运行显示如下：

``` text
---------- TEST.TXT
111
请按任意键继续. . .
```

例：

``` text
@echo off
echo 111 >test.txt
echo 222 >>test.txt
type test.txt|find "111"
del test.txt
pause
```

运行显示如下：

``` text
111
请按任意键继续. . .
```

## 10、 start 命令

批处理中调用外部程序的命令（该外部程序在新窗口中运行，批处理程序继续往下执行，不理会外部程序的运行状况），如果直接运行外部程序则必须等外部程序完成后才继续执行剩下的指令

例：

start explorer d:\

调用图形界面打开 D 盘

## 11、 assoc 和 ftype

文件关联

assoc 设置'文件扩展名'关联，关联到'文件类型'
ftype 设置'文件类型'关联，关联到'执行程序和参数'

当你双击一个.txt 文件时， windows 并不是根据.txt 直接判断用 notepad.exe 打开
而是先判断.txt 属于 txtfile '文件类型'
再调用 txtfile 关联的命令行 txtfile=%SystemRoot%\system32\NOTEPAD.EXE %1
可以在"文件夹选项"→"文件类型"里修改这 2 种关联

assoc #显示所有'文件扩展名'关联
assoc .txt #显示.txt 代表的'文件类型'，结果显示 .txt=txtfile
assoc .doc #显示.doc 代表的'文件类型'，结果显示 .doc=Word.Document.8
assoc .exe #显示.exe 代表的'文件类型'，结果显示 .exe=exefile
ftype #显示所有'文件类型'关联
ftype exefile #显示 exefile 类型关联的命令行，结果显示 exefile="%1" %*
assoc .txt=Word.Document.8
设置.txt 为 word 类型的文档，可以看到.txt 文件的图标都变了
assoc .txt=txtfile
恢复.txt 的正确关联

ftype exefile="%1" %*
恢复 exefile 的正确关联
如果该关联已经被破坏，可以运行 command.com ，再输入这条命令

## 12、 pushd 和 popd

切换当前目录

``` bat
@echo off
c: & cd\ & md mp3 #在 C:\ 建立 mp3 文件夹
md d:\mp4 #在 D:\ 建立 mp4 文件夹
cd /d d:\mp4 #更改当前目录为 d:\mp4
pushd c:\mp3 #保存当前目录，并切换当前目录为 c:\mp3
popd #恢复当前目录为刚才保存的 d:\mp4
```

一般用处不大，在当前目录名不确定时，会有点帮助。（dos 编程中很有用）

## 13、 CALL

CALL 命令可以在批处理执行过程中调用另一个批处理，当另一个批处理执行完后，再继续执行原来的批处理

CALL [drive:][path]filename [batch-parameters]

调用的其它批处理程序。 filename 参数必须具有 .bat 或 .cmd 扩展名。

CALL :label arguments

调用本文件内命令段，相当于子程序。被调用的命令段以标签:label 开头
以命令 goto :eof 结尾。

另外，批脚本文本参数参照(%0、 %1、等等)已如下改变:
批脚本里的 %* 指出所有的参数(如 %1 %2 %3 %4 %5 ...)
批参数(%n)的替代已被增强。您可以使用以下语法（看不明白的直接运行后面的例子）

%~1 - 删除引号(")，扩充 %1
%~f1 - 将 %1 扩充到一个完全合格的路径名
%~d1 - 仅将 %1 扩充到一个驱动器号
%~p1 - 仅将 %1 扩充到一个路径
%~n1 - 仅将 %1 扩充到一个文件名
%~x1 - 仅将 %1 扩充到一个文件扩展名
%~s1 - 扩充的路径指含有短名
%~a1 - 将 %1 扩充到文件属性
%~t1 - 将 %1 扩充到文件的日期/时间
%~z1 - 将 %1 扩充到文件的大小
%~$PATH : 1 - 查找列在 PATH 环境变量的目录，并将 %1

扩充到找到的第一个完全合格的名称。如果环境变量名未被定义，或者没有找到文件，此组合键会扩充到空字符串可以组合修定符来取得多重结果:

%~dp1 - 只将 %1 扩展到驱动器号和路径
%~nx1 - 只将 %1 扩展到文件名和扩展名
%~dp$PATH:1 - 在列在 PATH 环境变量中的目录里查找 %1，并扩展到找到的第一个文件的驱动器号和路径。
%~ftza1 - 将 %1 扩展到类似 DIR 的输出行。

在上面的例子中， %1 和 PATH 可以被其他有效数值替换。

%~ 语法被一个有效参数号码终止。 %~ 修定符不能跟 %*使用

注意：参数扩充时不理会参数所代表的文件是否真实存在，均以当前目录进行扩展
要理解上面的知识，下面的例子很关键。

例：

``` bat
@echo off
Echo 产生一个临时文件 > tmp.txt
Rem 下行先保存当前目录，再将 c:\windows 设为当前目录
pushd c:\windowsCall :sub tmp.txt
Rem 下行恢复前次的当前目录
Popd
Call :sub tmp.txt
pause
Del tmp.txt
:sub
Echo 删除引号： %~1
Echo 扩充到路径： %~f1
Echo 扩充到一个驱动器号： %~d1
Echo 扩充到一个路径： %~p1
Echo 扩充到一个文件名： %~n1
Echo 扩充到一个文件扩展名： %~x1
Echo 扩充的路径指含有短名： %~s1
Echo 扩充到文件属性： %~a1
Echo 扩充到文件的日期/时间： %~t1
Echo 扩充到文件的大小： %~z1
Echo 扩展到驱动器号和路径： %~dp1
Echo 扩展到文件名和扩展名： %~nx1
Echo 扩展到类似 DIR 的输出行： %~ftza1
Echo.
Goto :eof
```

## 14、 shift

更改批处理文件中可替换参数的位置。

SHIFT [/n]

如果命令扩展名被启用， SHIFT 命令支持/n 命令行开关；该命令行开关告诉命令从第 n 个参数开始移位； n 介于零和八之间。例如:

SHIFT /2

会将 %3 移位到 %2，将 %4 移位到 %3，等等；并且不影响 %0 和 %1。

## 15、 IF

IF 条件判断语句，语法格式如下：

IF [NOT] ERRORLEVEL number command
IF [NOT] string1==string2 command
IF [NOT] EXIST filename command

下面逐一介绍，更详细的分析请看后面章节。

### (1) IF [NOT] ERRORLEVEL number command

IF ERRORLEVEL这个句子必须放在某一个命令的后面， 执行命令后由IF ERRORLEVEL 来判断命令的返回值。

Number 的数字取值范围 0~255，判断时值的排列顺序应该由大到小。返回的值大于等于指定的值时，条件成立

例：

``` bat
@echo off
dir c:
rem 退出代码为>=1 就跳至标题 1 处执行， >=0 就跳至标题 0 处执行
IF ERRORLEVEL 1 goto 1
IF ERRORLEVEL 0 goto 0
Rem 上面的两行不可交换位置，否则失败了也显示成功。
:0
echo 命令执行成功！
Rem 程序执行完毕跳至标题 exit 处退出
goto exit
:1
echo 命令执行失败！
Rem 程序执行完毕跳至标题 exit 处退出
goto exit
:exit
pause
```

运行显示：命令执行成功！

### (2) IF [NOT] string1==string2 command

string1 和 string2 都为字符的数据，英文内字符的大小写将看作不同，这个条件中的等于号必须是两个（绝对相等的意思）

条件相等后即执行后面的 command
检测当前变量的值做出判断，为了防止字符串中含有空格，可用以下格式

if [NOT] {string1}=={string2} command
if [NOT] [string1]==[string2] command
if [NOT] “string1”==“string2” command

这种写法实际上将括号或引号当成字符串的一部分了，只要等号左右两边一致就行了，比如下面的写法就不行：

if {string1}==[string2] command

### (3) IF [NOT] EXIST filename command

EXIST filename 为文件或目录存在的意思

echo off
IF EXIST autoexec.bat echo 文件存在！
IF not EXIST autoexec.bat echo 文件不存在！

这个批处理大家可以放在 C 盘和 D 盘分别执行，看看效果

## 16、 setlocal 与 变量延迟

本条内容引用[英雄出品]的批处理教程：
要想进阶，变量延迟是必过的一关！所以这一部分希望你能认真看。
为了更好的说明问题，我们先引入一个例子。

例 1:

```bat
@echo off
set a=4
set a=5 & echo %a%
pause
```

结果： 4

解说：为什么是 4 而不是 5 呢？在 echo 之前明明已经把变量 a 的值改成 5 了？
让我们先了解一下批处理运行命令的机制：
批处理读取命令时是按行读取的（另外例如 for 命令等，其后用一对圆括号闭合的所有语句也当作一行），在处理之前要完成必要的预处理工作，这其中就包括对该行命令中的变量赋值。
我们现在分析一下例 1，批处理在运行到这句“set a=5 & echo %a%”之前，先把这一句整句读取并做了预处理——对变量 a 赋了值，那么%a%当然就是 4 了！（没有为什么，批处理就是这样做的。）
而为了能够感知环境变量的动态变化，批处理设计了变量延迟。简单来说，在读取了一条完整的语句之后，不立即对该行的变量赋值，而会在某个单条语句执行之前再进行赋值，也就是说“延迟”了对
变量的赋值。
那么如何开启变量延迟呢？变量延迟又需要注意什么呢？举个例子说明一下：

例 2:

``` bat
@echo off
setlocal enabledelayedexpansion
set a=4
set a=5 & echo !a!
pause
```

结果： 5

解 说 ： 启 动 了 变 量 延 迟 ， 得 到 了 正 确 答 案 。 变 量 延 迟 的 启 动 语 句 是 “ setlocalenabledelayedexpansion”，并且变量要用一对叹号“!!”括起来（注意要用英文的叹号），否则就没有变量延迟的效果。

分析一下例 2，首先“setlocal enabledelayedexpansion”开启变量延迟，然后“set a=4”先给变量 a 赋值为 4，“set a=5 & echo !a!”这句是给变量 a 赋值为 5 并输出（由于启动了变量延迟，所以批处理能够感知到动态变化，即不是先给该行变量赋值，而是在运行过程中给变量赋值，因此此时 a 的值就是 5 了）。

再举一个例子巩固一下。
例 3:

``` bat
@echo off
setlocal enabledelayedexpansion
for /l %%i in (1,1,5) do (
set a=%%i
echo !a!
)
pause
```

结果：

``` text
1
2
3
4
5
```

解说：本例开启了变量延迟并用“!!”将变量扩起来，因此得到我们预期的结果。如果不用变量延迟会出现什么结果呢？结果是这样的：

ECHO 处于关闭状态。
ECHO 处于关闭状态。
ECHO 处于关闭状态。
ECHO 处于关闭状态。
ECHO 处于关闭状态。

即没有感知到 for 语句中的动态变化。
