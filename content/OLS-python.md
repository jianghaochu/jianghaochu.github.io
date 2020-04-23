Title: Ordinary Least Squares Regression in Python from Scratch
Date: 04-21-2020
Category: Econometrics
Tags: Econometrics, NumPy

This article introduces how to calculate the coefficients for an Ordinary Least Squares regression in Python using only the `NumPy` package.
`NumPy` is the fundamental package for scientific computing with Python. It performs in some way similar to R. First, let us import the NumPy package.

```python
# import NumPy
import numpy as np
```
Then, let's generate some toy data to play with.

```python
# generate some random data
n, k = 100, 2
beta = np.array([1, 1, 10])
x = np.concatenate([np.ones((n, 1)), np.random.randn(n, k)], axis=1)
y = np.matmul(x, beta) + np.random.randn(n)
```

Now we have an n by k matrix $x$ as the design matrix and an n by 1 vector $y$ as the vector of endogenous variable. 
The OLS coefficients can be calculated using the formula below:
$$ \hat{\beta} = (x'x)^{-1}x'y. $$

Next, we calculate the value of the above formula using NumPy. 

```python
# Calculate OLS regression coefficients
beta_hat = np.matmul(np.matmul(np.linalg.inv(np.matmul(np.array(x).transpose(), np.array(x))), x.transpose()), y)
beta_hat
```

    array([ 0.93557686,  1.25994067, 10.01363476])

The values of the calculated OLS coefficients using the simulated toy data are shown above. We can further develop it
into a function for OLS regression and add other functionalities like calculating the variances of the OLS coefficients.