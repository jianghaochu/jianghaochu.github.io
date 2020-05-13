
Creating Pretty Tables in Python with PTable
============================================

:Date: 05-12-2020
:Category: Python
:Tags: Python, PTable

Creating an output table in Python using PTable is fast and easy. This
article introduces the most useful functionalities of PTable, such as
adding rows and columns, changing text alignment and floating number
format, and clearing data, to get a quick start to make the ideal table
in no time.

If this is not enough, here are two detailed tutorials of PTable:
http://zetcode.com/python/prettytable/ and
https://github.com/jazzband/prettytable

**Install PTable in Terminal**

.. code::

    pip install ptable

**Install PTable in Jupyter kernel**

.. code:: ipython3

    import sys
    !{sys.executable} -m pip install ptable

Create an empty table
~~~~~~~~~~~~~~~~~~~~~

.. code:: ipython3

    ### Import the package
    from prettytable import PrettyTable

.. code:: ipython3

    ### Create a table
    table = PrettyTable()
    print(table)  # print an empty table


.. parsed-literal::

    ++
    ||
    ++
    ++
    

Edit table by row
~~~~~~~~~~~~~~~~~

.. code:: ipython3

    table.field_names = ['column1', 'column2']  # add column names
    print(table)


.. parsed-literal::

    +---------+---------+
    | column1 | column2 |
    +---------+---------+
    +---------+---------+
    

.. code:: ipython3

    table.add_row([11, 12])  # add a row
    table.add_row([21, 22])  # add another row
    print(table)


.. parsed-literal::

    +---------+---------+
    | column1 | column2 |
    +---------+---------+
    |    11   |    12   |
    |    21   |    22   |
    +---------+---------+
    

.. code:: ipython3

    table.del_row(1)  # delete the row with index 1
    print(table)


.. parsed-literal::

    +---------+---------+
    | column1 | column2 |
    +---------+---------+
    |    11   |    12   |
    +---------+---------+
    

Edit table by column
~~~~~~~~~~~~~~~~~~~~

.. code:: ipython3

    table.add_column('column3', [31.0])  # add a new column
    print(table)


.. parsed-literal::

    +---------+---------+---------+
    | column1 | column2 | column3 |
    +---------+---------+---------+
    |    11   |    12   |   31.0  |
    +---------+---------+---------+
    

Text alignment
~~~~~~~~~~~~~~

.. code:: ipython3

    table.align['column1'] = 'l'  # 'l', 'c', or 'r'
    table.align['column2'] = 'c'
    table.align['column3'] = 'r'
    print(table)


.. parsed-literal::

    +---------+---------+---------+
    | column1 | column2 | column3 |
    +---------+---------+---------+
    | 11      |    12   |    31.0 |
    +---------+---------+---------+
    

Floating number format
~~~~~~~~~~~~~~~~~~~~~~

.. code:: ipython3

    table.float_format['column3'] = "8.4"  # This is equivalent to '%8.4f' % column_value
    print(table)


.. parsed-literal::

    +---------+---------+----------+
    | column1 | column2 |  column3 |
    +---------+---------+----------+
    | 11      |    12   |  31.0000 |
    +---------+---------+----------+
    

Add title
~~~~~~~~~

.. code:: ipython3

    print(table.get_string(title="Table Title"))


.. parsed-literal::

    +------------------------------+
    |         Table title          |
    +---------+---------+----------+
    | column1 | column2 |  column3 |
    +---------+---------+----------+
    | 11      |    12   |  31.0000 |
    +---------+---------+----------+
    

Clear data
~~~~~~~~~~

.. code:: ipython3

    table.clear_rows()
    print(table)


.. parsed-literal::

    +---------+---------+---------+
    | column1 | column2 | column3 |
    +---------+---------+---------+
    +---------+---------+---------+
    
