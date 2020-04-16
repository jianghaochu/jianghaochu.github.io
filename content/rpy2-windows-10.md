Title: How to Install Rpy2 in Windows 10
Date: 4/4/2020
Category: Python
Tags: Python, R, Rpy2

Summary: Rpy2 is the most popular python interface to R. It allows python users to enjoy the breadth and depth
of R packages in python. Yet, unlike in UNIX-like operating systems,
it is not straightforward to properly install and set up Rpy2 in Windows. 
This article introduces how to install the Rpy2 python interface to R on a Windows 10 machine.

### Download Rpy2.whl
Unlike what we usually do to install packages for python, on a Windows machine, the following command might not work off-the-shell for rpy2:
```text
pip install rpy2
```
A work around is to download [rpy2](http://www.lfd.uci.edu/~gohlke/pythonlibs/#rpy2) from the Unofficial Windows Binaries for Python Extension Packages
to the current working directory. Then use the following command to install rpy2 from the downloaded file: 
```text
pip install rpy2‑2.9.5‑cp37‑cp37m‑win32.whl
```

### Set up R_HOME and R_USER
After successfully installing the rpy2 package, we need to set up two environment variables in Windows before
rpy2 can properly work.
Go to This PC -> Properties -> Advanced System Settings -> Environment Variables.

