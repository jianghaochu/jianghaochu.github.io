Title: How to Install Rpy2 in Windows 10
Date: 4/4/2020
Category: Python
Tags: Python, R, Rpy2

`Rpy2` is a popular Python interface to R. It allows Python users to enjoy the breadth and depth of R packages in Python. Yet, unlike in UNIX-like operating systems, it is not straightforward 
to install and set up `Rpy2` in Windows. This article shows a simple way to install the `Rpy2` Python interface to R on a Windows 10 machine.

### Download Rpy2.whl
Unlike what we would usually do to install Python packages, on a Windows machine, the following command might not work as expected for `rpy2`:
```text
pip install rpy2
```
A work around is to download [rpy2](http://www.lfd.uci.edu/~gohlke/pythonlibs/#rpy2) from the Unofficial Windows Binaries for Python Extension Packages
to the current working directory. Then use the following command to install `rpy2` from the downloaded file: 
```text
pip install rpy2‑2.9.5‑cp37‑cp37m‑win32.whl
```

### Set up R_HOME and R_USER
After successfully installing the package, we need to set up two environment variables in Windows before
`rpy2` can work properly.
Right click on This PC. Then go to Properties -> Advanced System Settings -> Environment Variables.
First, create a new system variable, R_HOME, which takes the path of the R installation directory as its value.
For me, it looks like this.
```text
C:\Program Files\R\R-3.6.3\
```
Then, create another system variable, R_USER, which takes the path of the `rpy2` installation directory as its value.
For me, it looks like this.
```text
F:\MyProject\venv\Lib\site-packages\rpy2
```
Note: If it still does not work properly, try creating R_USER as a user variable too.

Now `rpy2` should work as expected and you can start using the R packages you like.
