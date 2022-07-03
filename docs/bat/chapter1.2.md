# 第一章 第二节 批处理基础 常用特殊符号

1、 @ 命令行回显屏蔽符

2、 % 批处理变量引导符

3、 > 重定向符

4、 >> 重定向符

5、 <、 >&、 <& 重定向符

6、 | 命令管道符

7、 ^ 转义字符

8、 & 组合命令

9、 && 组合命令

10、 || 组合命令

11、 "" 字符串界定符

12、 , 逗号

13、 ; 分号

14、 () 括号

15、 ! 感叹号

16、批处理中可能会见到的其它特殊标记符: （略）  
    CR(0D) 命令行结束符  
    Escape(1B) ANSI 转义字符引导符  
    Space(20) 常用的参数界定符  
    Tab(09) ; = 不常用的参数界定符  
    + COPY 命令文件连接符  
    * ? 文件通配符  
    / 参数开关引导符: 批处理标签引导符  

废话少说，开讲了

## 1、 @ 命令行回显屏蔽符

这个字符在批处理中的意思是关闭当前行的回显。我们从前几课知道 ECHO OFF 可以关闭掉整个批处理命令的回显，但不能关掉 ECHO OFF 这个命令，现在我们在 ECHO OFF 这个命令前加个@，就可以达到所有命令均不回显的要求

## 2、 % 批处理变量引导符

这个百分号严格来说是算不上命令的，它只是批处理中的参数而已（多个%一起使用的情况除外，以后还将详细介绍）。

引用变量用%var%，调用程序外部参数用%1 至%9 等等

%0 %1 %2 %3 %4 %5 %6 %7 %8 %9 %*为命令行传递给批处理的参数  
%0 批处理文件本身，包括完整的路径和扩展名  
%1 第一个参数  
%9 第九个参数  
%* 从第一个参数开始的所有参数  

参数%0 具有特殊的功能，可以调用批处理自身，以达到批处理本身循环的目的，也可以复制文件自身等等。

例：最简单的复制文件自身的方法

copy %0 d:\wind.bat

## 3、 > 重定向符

输出重定向命令
这个字符的意思是传递并且覆盖，他所起的作用是将运行的结果传递到后面的范围（后边可以是文件，也可以是默认的系统控制台）

在 NT 系列命令行中，重定向的作用范围由整个命令行转变为单个命令语句，受到了命令分隔符&,&&,||和语句块的制约限制。  

比如：  
使用命令： echo hello >1.txt 将建立文件 1.txt，内容为” hello “（注意行尾有一空格）  
使用命令： echo hello>1.txt 将建立文件 1.txt，内容为” hello“（注意行尾没有空格）  

## 4、 >> 重定向符

输出重定向命令  
这个符号的作用和>有点类似，但他们的区别是>>是传递并在文件的末尾追加，而>是覆盖用法同上同样拿 1.txt 做例子  

使用命令：

echo hello > 1.txt  
echo world >>1.txt  

这时候 1.txt 内容如下:

hello  
world  

## 5、 <、 >&、 <& 重定向符

这三个命令也是管道命令，但它们一般不常用，你只需要知道一下就 ok 了，当然如果想仔细研究的话，可以自己查一下资料。 (本人已查过，网上也查不到相关资料) <，输入重定向命令，从文件中读入命令输入，而不是从键盘中读入。

@echo off  
echo 2005-05-01>temp.txt  
date <temp.txt  
del temp.txt  

这样就可以不等待输入直接修改当前日期  

`>&`，将一个句柄的输出写入到另一个句柄的输入中。  
`<&`，刚好和>&相反，从一个句柄读取输入并将其写入到另一个句柄输出中。  

常用句柄： 0、 1、 2，未定义句柄： 3—9  

1>nul 表示禁止输出正确的信息  
2>nul 表示禁止输出错误信息。  

其中的 1 与 2 都是代表某个数据流输入输出的地址（NT CMD 称之为句柄， MSDOS 称之为设备）。  

句柄 0：标准输入 stdin，键盘输入  
句柄 1：标准输出 stdout，输出到命令提示符窗口（console，代码为 CON）  
句柄 2：标准错误 stderr，输出到命令提示符窗口（console，代码为 CON）  

其中的 stdin 可被<重定向， stdout 可被>、 >>重定向，而 stderr 在 DOS 下不可直接重定向，
只有通过 ctty 或其它命令将系统控制权转交给其它设备的方式，来间接完成。

## 6、 | 命令管道符

格式：第一条命令 | 第二条命令 [| 第三条命令...]  

将第一条命令的结果作为第二条命令的参数来使用，记得在 unix 中这种方式很常见。  

例如：

dir c:\|find "txt"

以上命令是：查找 C： \所有，并发现 TXT 字符串。  
FIND 的功能请用 FIND /? 自行查看  
在不使 format 的自动格式化参数时，我是这样来自动格式化 A 盘的  

echo y|format a: /s /q /v:system  

用过 format 的都知道，再格盘时要输入 y 来确认是否格盘，这个命令前加上 echo y 并用|字符来将 echo y 的结果传给 format 命令  
从而达到自动输入 y 的目的  
（这条命令有危害性，测试时请慎重）  

## 7、 ^ 转义字符

^是对特殊符号<,>,&的前导字符，在命令中他将以上 3 个符号的特殊功能去掉，仅仅只把他们当成符号而不使用他们的特殊意义。

比如

echo test ^>1.txt

结果则是： test > 1.txt

他没有追加在 1.txt 里，呵呵。只是显示了出来  
另外，此转义字符还可以用作续行符号。  
举个简单的例子：  

```bat
@echo off  
echo 英雄^
是^
好^
男人
pause
```

不用多说，自己试一下就明白了。  

## 8、 & 组合命令

语法：第一条命令 & 第二条命令 [& 第三条命令...]

&、 &&、 ||为组合命令，顾名思义，就是可以把多个命令组合起来当一个命令来执行。这在批处理脚本里是允许的，而且用的非常广泛。因为批处理认行不认命令数目。

这个符号允许在一行中使用 2 个以上不同的命令，当第一个命令执行失败了，也不影响后边的命令执行。

这里&两边的命令是顺序执行的，从前往后执行。

比如：

dir z:\ & dir y:\ & dir c:\

以上命令会连续显示 z,y,c 盘的内容，不理会该盘是否存在

## 9、 && 组合命令

语法：第一条命令 && 第二条命令 [&& 第三条命令...]

用这种方法可以同时执行多条命令，当碰到执行出错的命令后将不执行后面的命令，如果一直没有出错则一直执行完所有命令

这个命令和上边的类似，但区别是，第一个命令失败时，后边的命令也不会执行

dir z:\ && dir y:\ && dir c:\

## 10、 || 组合命令

语法：第一条命令 || 第二条命令 [|| 第三条命令...]

用这种方法可以同时执行多条命令，当一条命令失败后才执行第二条命令，当碰到执行正确的命令后将不执行后面的命令，如果没有出现正确的命令则一直执行完所有命令；

提示：组合命令和重定向命令一起使用必须注意优先级  
管道命令的优先级高于重定向命令，重定向命令的优先级高于组合命令  
问题：把 C 盘和 D 盘的文件和文件夹列出到 a.txt 文件中。你将如何来搞定这道题？有朋友  
说，这还不是很 easy 的问题吗？同时执行两个 dir，然后把得到的结果>到 a.txt 里就 ok 了嘛，  

看例：

dir c:\ && dir d:\ > a.txt

仔细研究一下这句执行后的结果，看看是否能达到题目的要求！错了！这样执行后 a.txt 里只有 D 盘的信息！为什么？  

就因为这里&&命令和>命令不能同时出现一个句子里（批处理把一行看成一个句子）！！组合命令&&的优先级没有管道命令>的优先级高（自己总结的，不妥的地方请指正）！所以这句在执行时将本行分成这两部分： dir c:\和 dir d:\ > a.txt，而并不是如你想的这两部分： dir c:\ && dir d:\和> a.txt。要使用组合命令&&达到题目的要求，必须得这么写：

dir c:\ > a.txt && dir d:\ >> a.txt

这样，依据优先级高低， DOS 将把这句话分成以下两部分： dir c:\ > a.txt 和 dir d:\ >> a.txt。

例十八中的几句的差别比较特殊，值得好好研究体会一下。

当然这里还可以利用&命令（自己想一下道理哦）：

dir c:\ > a.txt & dir d:\ >> a.txt

## 11、 "" 字符串界定符

双引号允许在字符串中包含空格，进入一个特殊目录可以用如下方法

``` bat
cd "program files"
cd progra~1
cd pro*
```

以上三种方法都可以进入 program files 这个目录

## 12、 , 逗号

逗号相当于空格，在某些情况下“,”可以用来当做空格使

比如 dir,c:\

## 13、 ; 分号

分号，当命令相同时，可以将不同目标用；来隔离，但执行效果不变，如执行过程中发生错误，则只返回错误报告，但程序仍会执行。（有人说不会继续执行，其实测试一下就知道了）

比如：

dir c:\;d:\;e:\;z:\

以上命令相当于

dir c:\  
dir d:\  
dir e:\  
dir f:\  

如果其中 z 盘不存在，运行显示：系统找不到指定的路径。然后终止命令的执行。

例： dir c:\;d:\;e:\1.txt

以上命令相当于

dir c:\  
dir d:\  
dir e:\1.txt  

其中文件 e:\1.txt 不存在，但 e 盘存在，有错误提示，但命令仍会执行。

为什么？如果目标路径不存在，则终止执行；如果路径存在，文件不存在，则继续执行。
就说这些了!各位有什么意见请回贴!有什么疑问请到 BAT 交流区发贴!下一节改进!

## 14、 () 括号

小括号在批处理编程中有特殊的作用，左右括号必须成对使用，括号中可以包括多行命令，这些命令将被看成一个整体，视为一条命令行。
括号在 for 语句和 if 语句中常见，用来嵌套使用循环或条件语句，其实括号()也可以单
独使用，请看例子。

例：

命令： `echo 1 & echo 2 & echo 3`

可以写成：

```bat
(  
echo 1  
echo 2  
echo 3  
)  
```

上面两种写法效果一样，这两种写法都被视为是一条命令行。
注意：这种多条命令被视为一条命令行时，如果其中有变量，就涉及到变量延迟的问题。

## 15、 ! 感叹号

没啥说的，在变量延迟问题中，用来表示变量，即%var%应该表示为!var!，请看前面的 setlocal
命令介绍。

累了，换换思维，有兴趣的可以学一段古文化：《三字经》第一节，可谓人人皆知。

【原文】

人(rãn) 之(zhī) 初(chū)，性(xìng) 本(běn) 善(shàn)，  
性(xìng) 相(xiāng) 近(jìn)，习(xí) 相(xiāng) 远(yuǎn)。  
苟(gǒu) 不(bú) 教(jiào)，性(xìng) 乃(nǎi) 迁(qiān)，  
教(jiào) 之(zhī) 道(dào)，贵(guì) 以(yǐ) 专(zhuān)。  

【字词义解释】

(1) 之：的。  
(2) 初：初生；刚开始的时候。  
(3) 性：本性；天性。  
(4) 本：本来。  
(5) 善：善良、好的。  
(6) 相：相当。  
(7) 近：接近。  
(8) 习：学习、后天的习惯。  
(9) 远：差别大。  
(10) 苟：如果。  
(11) 教：教导。  
(12) 乃：就会。  
(13) 迁：改变。  
(14) 道：方法。  
(15) 贵：注重。  
(16) 专：专心。  

【译文参考】
人刚生下来的时候，本性中有善的一面。这时候善良的本性，大致都很相近，没有多大的差
别。等到长大以后，因各人的环境不同，所学习的也不同；在好的环境人就会变好，在不好
的环境人就容易学坏，于是性情开始有了差别。假如在这个时候，不给他适当的教导，学了
种种不良的习惯，他原本善良的本性，就会渐渐变坏；而教导的方法，最重要的就是必须专
心一致，不可边做边停，才能使他有完整的学习。