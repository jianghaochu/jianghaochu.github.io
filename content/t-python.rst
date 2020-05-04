Calculating t-statistic for OLS Regression in Python
====================================================

:Date: 05/01/2020
:Category: Econometrics, Python
:Tags: Econometrics, Python

In a previous `article <{filename}/OLS-python.rst>`_, we calculated the
OLS estimate and its variance using only the ``Numpy`` package in
Python. In most cases, we would also need the t-statistic and its
p-value to see if the coefficients we got are statistically significant.
To achieve this, we will use ``SciPy``, a powerful scientific computing
library in Python.

First, we import the class of student's t-distributed random variables from
``SciPy``. In order to use the OLS estimate and variance estimate we
calculated using ``NumPy``. We also need to import the ``NumPy``
package.

.. code:: ipython3

    # Import SciPy and NumPy
    from scipy.stats import t  # We only need the t class from scipy.stats
    import numpy as np

Next, let's generate some toy data and calculate the OLS estimate and variance estimate as before.

.. code:: ipython3

    # Generate some random data
    n, k = 100, 2  # set the dimensions of the design matrix
    beta = np.array([1, 1, 10])  # set the true coefficients
    x = np.concatenate([np.ones((n, 1)), np.random.randn(n, k)], axis=1)  # generate random x
    y = np.matmul(x, beta) + np.random.randn(n)  # generate random y
    
    # Calculate OLS regression coefficients
    beta_hat = np.matmul(np.matmul(np.linalg.inv(np.matmul(np.array(x).transpose(), np.array(x))), x.transpose()), y)
    
    # Calculate Variance of OLS estimate
    residual = y - np.matmul(x, beta_hat)  # calculate the residual
    sigma_hat = sum(residual ** 2) / (n - k - 1)  # estimate of error term variance
    variance_beta_hat = sigma_hat * np.linalg.inv(np.matmul(x.transpose(), x))  # Calculate variance of OLS estimate

We can get the t-statistic by dividing an OLS estimate by its standard
error like below.

.. math::  t_{\hat{\beta}_i}=\frac{\hat{\beta}_i}{\sigma_i}

.. code:: ipython3

    # Calculate the t-statistic for each coefficient
    t_stat = beta_hat / np.sqrt(variance_beta_hat.diagonal())
    t_stat




.. parsed-literal::

    array([ 10.94146498,  12.18736475, 107.65469311])



Now, Let us calculate the p-value for each t-statistic using the cumulative
distribution function (CDF) of the student's t-distribution.

.. code:: ipython3

    # Get the p-value for each t-statistic
    p_value = 1 - 2 * np.abs(0.5 - np.vectorize(t.cdf)(t_stat, n - k - 1))
    p_value




.. parsed-literal::

    array([0., 0., 0.])



Since all the parameters are indeed in the data generating process
(DGP), the coefficients we got are super significant.
