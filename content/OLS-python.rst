Ordinary Least Squares Regression in Python from Scratch
========================================================

:Date: 04-21-2020
:Category: Econometrics, Python
:Tags: Econometrics, NumPy

This article introduces how to calculate the coefficients for an
Ordinary Least Squares regression in Python using only the ``NumPy``
package. ``NumPy`` is the fundamental package for scientific computing
with Python. It performs in some way similar to R. First, let us import
the ``NumPy`` package.

.. code:: ipython3

    # import NumPy
    import numpy as np

Then, let's generate some toy data to play with.

.. code:: ipython3

    # generate some random data
    n, k = 100, 2
    beta = np.array([1, 1, 10])
    x = np.concatenate([np.ones((n, 1)), np.random.randn(n, k)], axis=1)
    y = np.matmul(x, beta) + np.random.randn(n)

OLS Estimator
-------------

Now we have an :math:`n \times k` matrix :math:`x` as the design matrix
and an :math:`n \times 1` vector :math:`y` as the vector of the
endogenous variable. The OLS estimator can be calculated using the
formula below:

.. math::  \hat{\beta} = (x'x)^{-1}x'y. 

Next, we calculate the value of the OLS estimator with the formula above
using NumPy.

.. code:: ipython3

    # Calculate OLS regression coefficients
    beta_hat = np.matmul(np.matmul(np.linalg.inv(np.matmul(np.array(x).transpose(), np.array(x))), x.transpose()), y)
    beta_hat




.. parsed-literal::

    array([ 1.05552416,  1.0684565 , 10.08328924])



The values of the calculated OLS coefficients using the simulated toy
data are shown above. We can further develop it into a function and add
other functionalities like calculating the variance of the OLS estimate.

Variance of Estimator
---------------------

Next let us calculate the variance of the OLS estimate. From the formula
of the OLS estimator above, we can derive the formula of its variance to
be

.. math:: Var(\hat{\beta})=\sigma^2(X'X)^{-1},

where :math:`\sigma^2` is the variance of the error term. We can use the sample variance of the error term

.. math:: \hat{\sigma}^2 = \frac{\sum\hat{u}_i^2}{n-k-1},

where :math:`\hat{u_i}` are the residuals from the OLS regression as an
estimate of its true variance.

.. code:: ipython3

    # Calculate Variance of OLS estimate
    residual = y - np.matmul(x, beta_hat)  # calculate the residual
    sigma_hat = sum(residual ** 2) / (n - k - 1)  # estimate of error term variance
    variance_beta_hat = sigma_hat * np.linalg.inv(np.matmul(x.transpose(), x))  # Calculate variance of OLS estimate
    variance_beta_hat

.. parsed-literal::

    array([[ 0.01182717,  0.00117423, -0.00012874],
           [ 0.00117423,  0.01178575,  0.00108286],
           [-0.00012874,  0.00108286,  0.01194932]])
