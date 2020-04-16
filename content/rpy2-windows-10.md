Title: How to Install Rpy2 in Windows 10
Date: 4/4/2020
Category: Python
Tags: Python, R, Rpy2
Summary: Rpy2 is the most popular python interface to R. It allows python users to enjoy the breadth and depth of R packages in python. Yet, unlike in UNIX-like operating systems, it is not straightforward to properly install and set up Rpy2 in Windows. This article shows a simple way to install the Rpy2 python interface to R on a Windows 10 machine.

Rpy2 is the most popular python interface to R. It allows python users to enjoy the breadth and depth of R packages in python. Yet, unlike in UNIX-like operating systems, it is not straightforward to properly install and set up Rpy2 in Windows. This article shows a simple way to install the Rpy2 python interface to R on a Windows 10 machine.
### Download Rpy2.whl
Unlike what we usually do to install packages for python, on a Windows machine, the following command might not work as expected for rpy2:
```text
pip install rpy2
```
A work around is to download [rpy2](http://www.lfd.uci.edu/~gohlke/pythonlibs/#rpy2) from the Unofficial Windows Binaries for Python Extension Packages
to the current working directory. Then use the following command to install rpy2 from the downloaded file: 
```text
pip install rpy2‑2.9.5‑cp37‑cp37m‑win32.whl
```

### Set up R_HOME and R_USER
After successfully installing the package, we need to set up two environment variables in Windows before
rpy2 can properly work.
Right click on This PC. Then go to -> Properties -> Advanced System Settings -> Environment Variables.
Create a new systme varialbe, R_HOME, which takes the path of the R installation directory as its value.
For me, it looks like
```text
C:\Program Files\R\R-3.6.3\
```
Create another new system variable, R_USER, which takes the path of the rpy2 installation directory as its value.
For me, it looks like
```text
F:\MyProject\venv\Lib\site-packages\rpy2
```
Note: If it does not work properly, try creating R_USER as a user variable too.

Now rpy2 should work as expected.
