---
title: ARTS-week-11
date: 2020-03-22 11:18:15
tags:
---

## ARTS-2019 左耳听风社群活动--每周完成一个 ARTS
1.Algorithm: 每周至少做一个 leetcode 的算法题
2.Review: 阅读并点评至少一篇英文技术文章
3.Tip: 学习至少一个技术技巧
4.Share: 分享一篇有观点和思考的技术文章

### 1.Algorithm:

Assign Cookies https://leetcode.com/submissions/detail/314788039/

### 2.Review:

https://css-tricks.com/svg-line-animation-works/

#### 点评：

How SVG Line Animation Works
本文作者通过实例演示了如何实现 svg 线动态效果，并文章开头给出了其他人实现的例子效果。
Jake Archibald  https://jakearchibald.com/2013/animated-line-drawing-svg/
Brian Suda https://24ways.org/2013/animating-vectors-with-svg/
Polygon https://product.voxmedia.com/2013/11/25/5426880/polygon-feature-design-svg-animations-for-fun-and-profit
Codrops https://tympanus.net/Development/SVGDrawingAnimation/

步骤如下：
1. 有一个 SVG 图形
补充：可以用AI图形工具生成svg文件，或者用开源svg工具生成 https://www.zhangxinxu.com/sp/svg/

2. 图形必须有线条（stroke）
``` html
<path id="svg_3" d="m33.829996,375.163847l57.876095,0l0,57.876095l-57.876095,0l0,-57.876095zm6.752211,-51.123884l0,44.371673l44.371673,0l0,-44.371673l-44.371673,0z" stroke-width="5" stroke="#000000" fill="#FF0000"/>
```

3. 线条可以被设置成线段模式
``` xml
<svg ...>
  <path class="path" stroke="#000000" ... >
</svg>

.path {
  stroke-dasharray: 100;
}
```

4. 可以 “offset” 这些线段，以便让它们移动位置
``` xml
.path {
  stroke-dasharray: 100;
  animation: dash 5s linear;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}
```

5. 单个线段长度足以覆盖整个图形，给线条设置 offset，让它完全消失在图形范围内而不是覆盖整个图形。
``` xml
.path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 5s linear forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
```

6. 可以用 JavaScript 获取图形长度
``` JavaScript
var path = document.querySelector('.path');
var length = path.getTotalLength();
```

总结：
svg 线动态效果可以通过 css 样式 dasharray 和 动态修改 dashoffset 达到动态效果，应用场景非常丰富。

### 3.Tip:

Maven 打包 pom.xml 配置

1.Maven打包过程（顺序）

``` shell
clean清空之前生成的文件
IDE内编译该程序 （并测试可成功运行）-- 必须生成class文件！（等待被打包）
确定文件pom.xml中的各项配置
Maven刷新：Reimport All Maven Projects
Maven自动打包：Install或package
```

2.Maven打包依赖 scope (选项)

``` shell
scope可以配置5个值
    * compile，缺省值，适用于所有阶段，会随着项目一起发布。 
    * provided，类似compile，期望JDK、容器或使用者会提供这个依赖。如servlet.jar。 
    * runtime，只在运行时使用，如JDBC驱动，适用运行和测试阶段。 
    * test，只在测试时使用，用于编译和运行测试代码。不会随项目发布。 
    * system，类似provided，需要显式提供包含依赖的jar，Maven不会在Repository中查找它。
```

3.Maven打包忽略单元测试 (参数)

``` shell
在进行编译、打包时，maven会执行src/test/java中的单元测试用例，跳过测试用例有如下方法
1. mvn package -DskipTests
   -DskipTests，不执行测试用例，但编译测试用例类生成相应的class文件至target/test-classes下。

2. mvn package -Dmaven.test.skip=true
   -Dmaven.test.skip=true，不执行测试用例，也不编译测试用例类。
```

4.单个 jar pom.xml 配置

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.demo</groupId>
    <artifactId>demo</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>demo</name>
    <description>demo package</description>

    <!-- 指定工程编码为UTF-8
    这样maven install就不会发出警告 [WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
    -->
    <properties>
         <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

	<!-- 项目依赖的jar包 -->
    <dependencies>
        <!-- https://mvnrepository.com/artifact/commons-cli/commons-cli -->
        <dependency>
            <groupId>commons-cli</groupId>
            <artifactId>commons-cli</artifactId>
            <version>1.4</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13</version>
            <!-- 打jar包排除 -->
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
    
        <plugins>
        
            <plugin>
                <artifactId>maven-assembly-plugin</artifactId>
                <configuration>
                    <archive>
                        <manifest>
                            <addClasspath>true</addClasspath>
                           	<!--下面必须指定好主类 如com.demo.Main -->
                            <mainClass>Main</mainClass>
                        </manifest>
                        <manifestEntries>
                        	<!--jar:META-INF/MANIFEST.MF增加属性 Change: 1fad356 -->
                        	<Change>1fad356</Change>
                        </manifestEntries>
                    </archive>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                </configuration>
                <executions>
                    <execution>
                        <id>make-demo-jar-with-dependencies</id>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>

</project>

```

pom.xml 目录结构

``` shell
.
├── archive-tmp
├── classes
│   ├── CommandDemo.class
│   ├── META-INF
│   │   └── MANIFEST.MF
│   └── Main.class
├── maven-archiver
│   └── pom.properties
├── maven-status
│   └── maven-compiler-plugin
│       ├── compile
│       │   └── default-compile
│       │       ├── createdFiles.lst
│       │       └── inputFiles.lst
│       └── testCompile
│           └── default-testCompile
│               └── inputFiles.lst
├── demo-1.0.0-jar-with-dependencies.jar
└── demo-1.0.0.jar
```

5.单个 jar + lib pom.xml 配置

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.demo</groupId>
    <artifactId>demo</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>demo</name>
    <description>demo package</description>

    <!-- 指定工程编码为UTF-8
    这样maven install就不会发出警告 [WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
    -->
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- 项目依赖的jar包 -->
    <dependencies>
        <!-- https://mvnrepository.com/artifact/commons-cli/commons-cli -->
        <dependency>
            <groupId>commons-cli</groupId>
            <artifactId>commons-cli</artifactId>
            <version>1.4</version>
        </dependency>

        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13</version>
            <!-- 打jar包排除 -->
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
    
        <!-- 下面这个plugin-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <configuration>
                    <archive>
                        <manifest>
                            <addClasspath>true</addClasspath>
                            <!--指定classpath的前缀-->
                            <classpathPrefix>lib/</classpathPrefix>
                            <!--指定主类的类名-->
                            <mainClass>Main</mainClass>
                        </manifest>
                        <manifestEntries>
                        	<!--jar:META-INF/MANIFEST.MF增加属性 Change: 1fad356 -->
                        	<Change>1fad356</Change>
                        </manifestEntries>
                    </archive>
                </configuration>
            </plugin>

            <!--  -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <executions>
                    <execution>
                        <id>copy-dependencies</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <configuration>
                            <!--指定outputDirectory-->
                            <outputDirectory>${project.build.directory}/lib</outputDirectory>
                            <overWriteReleases>false</overWriteReleases>
                            <overWriteSnapshots>false</overWriteSnapshots>
                            <overWriteIfNewer>true</overWriteIfNewer>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>

</project>

```

pom.xml 目录结构

``` shell
#用下面的pom.xml 得到的 一部分目录结构（保证下面的目录结构即可运行jar程序）

─── lib  #依赖包
│   ├── commons-cli-1.2.jar
└── demo-1.0.0.jar #maven生成的 主jar包

#用下面的pom.xml 得到的  完整目录结构：

── classes #maven生成的
│   ├── CommandDemo.class
│   ├── META-INF
│   │   └── MANIFEST.MF #maven生成的 清淡文件
│   └── Main.class
├── lib  #依赖包
│   ├── commons-cli-1.2.jar
├── maven-archiver #maven生成的
│   └── pom.properties
├── maven-status#maven生成的
│   └── maven-compiler-plugin
│       ├── compile
│       │   └── default-compile
│       │       ├── createdFiles.lst
│       │       └── inputFiles.lst
│       └── testCompile
│           └── default-testCompile
│               └── inputFiles.lst
└── demo-1.0.0.jar #maven生成的 主jar包
```

### 4.Share:

Jupyter Notebook 自定义主题 
https://www.jianshu.com/p/168a2509db79

python，pip国内源 
https://www.cnblogs.com/hgSuper/p/8902448.html