var tipuesearch = {"pages":[{"title":"About Me","text":"Hi, I'm Jianghao! I am a data scientist specialized in economic modeling and business analytics. I received my Ph.D. in Economics, M.S. in Applied Mathematics and M.A. in Economics from the University of California, Riverside and my B.S. in Finance from Huazhong University of Science and Technology. This site is mainly aimed to record some of my personal interests and learning experience for future reference. It would be my pleasure if the information shared here can be of use to someone else. Please feel free to reach out to me at jianghaochu@gmail.com if you have any questions!","tags":"pages","url":"/pages/about-me.html","loc":"/pages/about-me.html"},{"title":"Version Control with Git: Check Differences","text":"Changing Git history Check Changes from Last Commit git diff git add -p git rm git mv git checkout [-p] <file> git restore <file> git reset [-p] git restore --staged <file> git stash git stash apply git checkout -b new_branch HEAD~2 git reset --hard HEAD~3 # Go back in time, throwing away changes git reset --soft HEAD~3 # Set HEAD to point to an earlier commit git reset --hard # Wipe out differences in the working tree git stash git checkout -b new-branch HEAD~3 # head back in time! git stash # because it's always a good thing to do git reset --hard HEAD~3 # go back in time git reset --hard HEAD@ { 1 } # oops, that was a mistake, undo it! git stash apply # and bring back my working tree changes git commit --amend git revert <commit tag> Best Practices for Collaboration Always synchronize your branches before starting any work on your own. Make changes that are self-contained. Avoid having very large changes that modify a lot of different things. (Try to make changes as small as possible as long as they're self-contained.) When working on a big change, it makes sense to have a separate feature branch. Regularly merge changes made on the master branch back onto the feature branch. Have the latest version of the project in the master branch, and the stable version of the project on a separate branch. You shouldn't rebase changes that have been pushed to remote repos. Write commit messages. Only edit the same branch when necessary after submitting a pull request. git remote -v git rebase [-i] git push [-f] [-u] origin branch_name codeowner: https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/about-code-owners code improvement: clear/meaningful variable names GitHub Configuration git config [ --global ]","tags":"Git","url":"/version-control-with-git-check-differences.html","loc":"/version-control-with-git-check-differences.html"},{"title":"Formulae Auto-Derivation for Nested Logit Models","text":"This file uses the Symbolic Python (SymPy) package to derive the elasticity formulae for Nested Logit Models. SymPy is a Python library for symbolic mathematics. It aims to become a full-featured computer algebra system (CAS) while keeping the code as simple as possible in order to be comprehensible and easily extensible. More details about SymPy can be found on the SymPy package main page: SymPy . To use the SymPy package, we first have to import the SymPy package as follows. Note that we also include the init_printing() function to enable the pretty print which is particularly useful when we are printing a large amount of mathematical formulae. #### Import libraries from sympy import * import sys init_printing () Before doing the real math, first let us familiarize ourselves with the basic functions in SymPy that we are going to use. Before using a symbolic mathematical variable, we have to define the variable using Symbol() . Then we can go on and doing simple mathematics just like how we will do them in Python. # Define new symbolic mathematical variables and add them up a = Symbol ( 'a' ) b = Symbol ( 'b' ) a + b Another helpful function in SymPy that we are going to use a lot is taking the derivative, diff() . # Taking the derivative of a mathematical expression with respect to the varaible a diff ( sin ( a + b ) - ( a + b ) ** ( a + b ), a ) The last function that we are going to use heavily later is the subs() method of a SymPy expression. We will use this function to substitute certain part of the express with something that is more readable and understandable to human eyes. # Subtitute (a + b) with t to simplify the expression t = Symbol ( 't' ) diff ( sin ( a + b ) - ( a + b ) ** ( a + b ), a ) . subs ( a + b , t ) Next, let's set up our model by specifying a few basic parameters in the model. #### Settings number_end_group = 3 # This is the number of vehicles in each end group of our tree number_splits_non_end_node = 2 # This is the number of splits for each node if the node is not on the last two levels depth_of_tree = 3 # This is the depth of our tree From the above settings, we build up a tree with the following structre. import matplotlib.pyplot as plt % matplotlib inline decision_node = dict ( boxstyle = \"sawtooth\" , fc = \"0.8\" ) leaf_node = dict ( boxstyle = \"round4\" , fc = \"0.8\" ) arrow_args = dict ( arrowstyle = \"<-\" ) def get_leaf_num ( tree ): leaf_num = 0 for key in tree . keys (): if type ( tree [ key ]) . __name__ == \"dict\" : leaf_num += get_leaf_num ( tree [ key ]) else : leaf_num += 1 return leaf_num def get_tree_depth ( tree ): depth = 0 for key in tree . keys (): if type ( tree [ key ]) . __name__ == \"dict\" : thisdepth = 1 + get_tree_depth ( tree [ key ]) else : thisdepth = 1 if thisdepth > depth : depth = thisdepth return depth def plotNode ( nodeTxt , centerPt , parentPt , nodeType ): createPlot . ax1 . annotate ( nodeTxt , xy = parentPt , xycoords = 'axes fraction' , xytext = centerPt , textcoords = 'axes fraction' , va = \"center\" , ha = \"center\" , bbox = nodeType , arrowprops = arrow_args ) def plotTree ( myTree , parentPt , nodeTxt ): numLeafs = get_leaf_num ( myTree ) depth = get_tree_depth ( myTree ) firstStr = list ( myTree . keys ())[ 0 ] cntrPt = ( plotTree . xOff + ( 1.0 + float ( numLeafs )) / 2.0 / plotTree . totalW , plotTree . yOff ) plotNode ( firstStr , cntrPt , parentPt , decision_node ) secondDict = myTree [ firstStr ] plotTree . yOff = plotTree . yOff - 1.0 / plotTree . totalD for key in myTree . keys (): if type ( myTree [ key ]) . __name__ == 'dict' : plotTree ( myTree [ key ], cntrPt , str ( key )) else : plotTree . xOff = plotTree . xOff + 1.0 / plotTree . totalW plotNode ( myTree [ key ], ( plotTree . xOff , plotTree . yOff ), cntrPt , leaf_node ) plotTree . yOff = plotTree . yOff + 1.0 / plotTree . totalD def createPlot ( inTree ): fig = plt . figure ( 1 , facecolor = 'white' ) fig . clf () axprops = dict ( xticks = [], yticks = []) createPlot . ax1 = plt . subplot ( 111 , frameon = False , ** axprops ) plotTree . totalW = float ( get_leaf_num ( inTree )) plotTree . totalD = float ( get_tree_depth ( inTree )) plotTree . xOff = - 0.5 / plotTree . totalW plotTree . yOff = 1.0 plotTree ( inTree , ( 0.5 , 1.0 ), '' ) plt . show () def create_dict ( level ): global count , number_end_group , number_splits_non_end_node , depth_of_tree if level == depth_of_tree - 1 : dic = dict () for i in range ( number_end_group ): dic [ str ( i )] = count count += 1 return dic else : dic = dict () for i in range ( number_splits_non_end_node ): name = str ( i ) dic [ str ( i )] = create_dict ( level + 1 ) return dic count = 0 createPlot ( create_dict ( 0 )) Now that we finished setting up our model we can start calculating the formulae of interest. Let's first review the formulae for the share and elasticities in the Nested Logit Model. The share of one end node in the Nested Logit Model is Self-elasticity The self-elasticity of the node is and the cross-elasticity of the node with another node within the same group in the second to last layer is # Basic elements for calculation total_end_nodes = number_splits_non_end_node ** ( depth_of_tree - 1 ) * number_end_group for i in range ( total_end_nodes ): exec ( 'p_ %d = symbols(\"p_ %d \")' % ( i , i )) total_theta = 0 for i in range ( depth_of_tree ): total_theta += number_splits_non_end_node ** i for i in range ( total_end_nodes ): exec ( 'v_ %d = symbols(\"v_ %d \")' % ( i , i )) for i in range ( depth_of_tree ): for j in range ( number_splits_non_end_node ** i ): exec ( 'theta_ %d _ %d = symbols(\"theta_ %d _ %d \")' % ( i , j , i , j )) for i in range ( depth_of_tree + 1 ): exec ( 's_ %d = symbols(\"s_ %d \")' % ( i , i )) # Intermediate sums in s for i in range ( total_end_nodes ): exec ( 'sum_exp_ %d _ %d = exp(v_ %d / theta_ %d _ %d )' % ( depth_of_tree , i , i , depth_of_tree - 1 , i // number_end_group )) for i in range ( total_end_nodes // number_end_group ): st = 'sum_ %d _ %d =' % ( depth_of_tree - 1 , i ) for j in range ( i * number_end_group , i * number_end_group + number_end_group ): st = st + ' exp(v_ %d / theta_ %d _ %d ) +' % ( j , depth_of_tree - 1 , i ) exec ( st [: - 1 ]) exec ( 'sum_exp_ %d _ %d = sum_ %d _ %d ** (theta_ %d _ %d / theta_ %d _ %d )' % ( depth_of_tree - 1 , i , depth_of_tree - 1 , i , depth_of_tree - 1 , i , depth_of_tree - 2 , i // number_splits_non_end_node )) for k in range ( depth_of_tree - 2 , 0 , - 1 ): for i in range ( number_splits_non_end_node ** k ): st = 'sum_ %d _ %d =' % ( k , i ) for j in range ( i * number_splits_non_end_node , ( i + 1 ) * number_splits_non_end_node ): st = st + ' sum_exp_ %d _ %d +' % ( k + 1 , j ) exec ( st [: - 1 ]) exec ( 'sum_exp_ %d _ %d = sum_ %d _ %d ** (theta_ %d _ %d / theta_ %d _ %d )' % ( k , i , k , i , k , i , k - 1 , i // number_splits_non_end_node )) st = 'sum_0_0 =' for j in range ( number_splits_non_end_node ): st = st + ' sum_exp_ %d _ %d +' % ( 1 , j ) exec ( st [: - 1 ]) exec ( 'sum_exp_0_0 = sum_0_0 ** (theta_0_0)' ) # Calculate final expression for s exec ( 's = sum_exp_ %d _0 / (1 + sum_0_0 ** theta_0_0)' % depth_of_tree ) for i in range ( depth_of_tree ): exec ( 's = s / sum_ %d _0 * sum_exp_ %d _0' % ( i , i )) s #### Deriving the own-elasticity formular s_diff = diff ( s , v_0 ) s_simp = s_diff . subs ( sum_exp_0_0 / ( 1 + sum_exp_0_0 ), s_0 ) for i in range ( depth_of_tree ): exec ( 's_simp = s_simp.subs(sum_exp_ %d _0 / sum_ %d _0, s_ %d / s_ %d )' % ( i + 1 , i , i + 1 , i )) s_simp beta = symbols ( 'beta' ) p_0 = symbols ( 'p_0' ) exec ( 'output = p_0 * beta * expand(s_simp / s_ %d )' % depth_of_tree ) output Cross-elasticity #### Deriving the cross-elasticity formular for vehicles in the same make_region (second to the lowest level) level_of_similarity = 0 # starts from 0 diff_node = total_end_nodes // number_splits_non_end_node ** level_of_similarity - 1 exec ( 's_diff_v_x = diff(s, v_ %d )' % diff_node ) s_v_0 = s s_simp = s_diff_v_x . subs ( sum_exp_0_0 / ( 1 + sum_exp_0_0 ), s_0 ) s_v_0 = s_v_0 . subs ( sum_exp_0_0 / ( 1 + sum_exp_0_0 ), s_0 ) for i in range ( level_of_similarity ): exec ( 's_simp = s_simp.subs(sum_exp_ %d _0 / sum_ %d _0, s_ %d / s_ %d )' % ( i + 1 , i , i + 1 , i )) exec ( 's_v_0 = s_v_0.subs(sum_exp_ %d _0 / sum_ %d _0, s_ %d / s_ %d )' % ( i + 1 , i , i + 1 , i )) for i in range ( level_of_similarity , depth_of_tree ): exec ( 's_simp = s_simp.subs(sum_exp_ %d _ %d / sum_ %d _ %d , s_ %d / s_ %d )' % ( i + 1 , diff_node // number_end_group // number_splits_non_end_node ** ( depth_of_tree - i - 2 ), i , diff_node // number_end_group // number_splits_non_end_node ** ( depth_of_tree - i - 1 ), i + 1 , i )) exec ( 's_v_0 = s_v_0.subs(sum_exp_ %d _ %d / sum_ %d _ %d , s_ %d / s_ %d )' % ( i + 1 , diff_node // number_end_group // number_splits_non_end_node ** ( depth_of_tree - i - 2 ), i , diff_node // number_end_group // number_splits_non_end_node ** ( depth_of_tree - i - 1 ), i + 1 , i )) exec ( 's_simp = s_simp.subs(exp(v_ %d /theta_ %d _ %d ) / sum_ %d _ %d , s_ %d / s_ %d )' % ( diff_node , depth_of_tree - 1 , diff_node // number_end_group , depth_of_tree - 1 , diff_node // number_end_group , depth_of_tree , depth_of_tree - 1 )) exec ( 's_v_0 = s_v_0.subs(exp(v_ %d /theta_ %d _ %d ) / sum_ %d _ %d , s_ %d / s_ %d )' % ( diff_node , depth_of_tree - 1 , diff_node // number_end_group , depth_of_tree - 1 , diff_node // number_end_group , depth_of_tree , depth_of_tree - 1 )) beta = Symbol ( 'beta' ) p_1 = Symbol ( 'p_1' ) beta * p_1 * simplify ( s_simp / s_v_0 ) # Cross-elasticity with outside option outside_s = 1 - sum_exp_0_0 / ( 1 + sum_exp_0_0 ) s_diff_v_0 = diff ( outside_s , v_0 ) s_simp = s_diff_v_0 / outside_s s_simp = s_simp . subs ( sum_exp_0_0 / ( 1 + sum_exp_0_0 ), s_0 ) for i in range ( depth_of_tree ): exec ( 's_simp = s_simp.subs(sum_exp_ %d _0 / sum_ %d _0, s_ %d / s_ %d )' % ( i + 1 , i , i + 1 , i )) beta = Symbol ( 'beta' ) p_1 = Symbol ( 'p_1' ) beta * p_1 * simplify ( s_simp )","tags":"Python","url":"/formulae-auto-derivation-for-nested-logit-models.html","loc":"/formulae-auto-derivation-for-nested-logit-models.html"},{"title":"Bash Cheat Sheet","text":"Basic Commands echo cat ls [ -la ] # list files in the present directory chmod [ +x ] file mkdir # make new directories cd # change the directory pwd # present working directory cp path_from path_to # copy mv path_from path_to rm path # delect files rmdir # delete empty directories touch file_name # create empty file tr ' ' '\\n' # translate ' ' into '\\n' sort [ -nr ] # sort [numerically, reversely] uniq [ -c ] # unique [with number of occurance] head # first 10 lines grep # regular expression ps ax | e # processes cut date who man kill fg bg jobs free uptime .. # parent directory . # current directory > # redirect the output, destination is overwritten >> # redirect the output and append to the destination < # read input from file 2 > # redirect stderr to a file | # pipe ls -l | less Bash Scripting use ; to separate command in the same line $(command) export varaible_name=value # no space around =, local if without export echo $variable_name *? # globs $? exit status of commands, 0 if True if grep \"126.0.0.1\" /etc/hosts; then echo \"something\" else echo \"something else\" fi test -n \"$PATH\" # return 0 if True, 1 if False if [ -n \"$PATH\" ]; then echo \"something\"; fi while [ $n -le 5 ]; do some command Done $1 # first argument after command for fruit in a b c; do echo $fruit done name=\"abs\" \"$name.html\"","tags":"Bash","url":"/bash-cheat-sheet.html","loc":"/bash-cheat-sheet.html"},{"title":"Version Control with Git (1): Basic Workflow","text":"Git can be seen as taking a series of snapshots of important stages of a project. If we want Git to take a snapshot of the current status of the project, we make a commit. by recording the changes made in each commit. Changes can be untracked, staged (cached) or commited. If we make a change to a file in the project, it will first appear as untracked. Untracked changes do not make any difference to Git. If we think the change is meanful and plan to save it, we need to staged it to tell Git to include it in the next commit. After we stage all the changes we want to include in this commit, we commit the staged changes and Git will save the changes. Untracked changes are not protected by Git and can be easily discarded. Staged changes are the changes to be saved in the next snapshot. Commited changes are the changes already saved in a snapshot by Git. This blog shows how to use Git in a brand new project. We will cover creating a repository, staging and commiting changes, adding a remote repository, and pushing commits. Create or clone a Git repository To use Git for version control, we need to have a Git repository. We can get it by initiating Git in a local directory or cloning a remote Git repository. First, go to the directory that we want Git to track for us and use one of the following commands to create a Git repository. git init # initiate git in a local directory git clone URL_or_SSH_key_of_remote_directory # clone a remote git repository from GitHub Check status We can make changes, e.g. create new files, in the directory and use git status to check the status of the repository. git status If there is any new file, it should show up in untracked files. This means that Git has noticed the new file but hasn't started to track its changes. Add files to repository We can tell Git to track changes made to the file by using git add to stage the changes. git add file_name Instead of a single file name, we can also use * to add all files to Git or . to add all files in the current directory. Commit chagnes If we want Git to save the staged changes of the directory, we can use git commit to commit the staged changes. git commit This will pop up an editor to let us leave some commit messages about what has been changed in this commit. The commit will be made after we close the editor. In this commit, Git saves the staged changes made to the directory after the last commit. Hence, we can go back to a previous state of the directory by reverting one or more commits. Moreover, we can choose to revert a commit that was made several commits ago while keeping changes in later commits. Add remote repository We can share the changes with others by pushing the commit to a server like GitHub. First, add the remote repository using git remote add . git remote add origin URL_or_SSH_key_of_remote_directory Push to remote repository Then, push the commit to the remote repository using git push . git push -u origin branch_name Now the changes are published on GitHub and shared with everyone that has access to the repository. Pull commits from remote repository If we are collaborating with other people, it is better to always keep the local directory updated by pulling the latest commits from the remote repository before we make any changes. We can do it using git pull . git pull If everything looks good, we can make new changes to the directory and follow the add, commit, push workflow to save and share every progress.","tags":"Git","url":"/version-control-with-git-1-basic-workflow.html","loc":"/version-control-with-git-1-basic-workflow.html"},{"title":"Using Jupyter Notebook with Pelican in Windows","text":"Update: This solution does not work with nbconvert >= 6. Tested on nbconvert == 5.6.1. Jupyter-Pelican is a plugin that helps Pelican to generate static contents from Jupyter notebook. I like it because it allows the user to put the metadata in the first cell of the notebook. No need to create a separate file for the metadata or edit the metadata of the notebook. However, this option will encounter a permission denied error on Windows OS because Windows does not allow (at least easily) openning a temporary file for a second time, according to the documentation of tempfile.NamedTemporaryFile . Other discussions on reading a temporary file in Windows can be found at Python bug tracker and stackoverflow . The lines causing the error are as below: with tempfile . NamedTemporaryFile ( \"w+\" , encoding = \"utf-8\" ) as metadata_file : md_reader = MarkdownReader ( self . settings ) metadata_file . write ( metacell ) metadata_file . flush () _content , metadata = md_reader . read ( metadata_file . name ) Right now, there is no perfect fix. So I went ahead and changed the lines in my local library as below: metadata_file = tempfile . NamedTemporaryFile ( \"w+\" , encoding = \"utf-8\" , delete = False ) try : md_reader = MarkdownReader ( self . settings ) metadata_file . write ( metacell ) metadata_file . flush () metadata_file . close () _content , metadata = md_reader . read ( metadata_file . name ) finally : os . remove ( metadata_file . name ) It's not an elegant solution but now everything works. I can have Jupyter notebook organize all my Markdown, LaTex, input and output while having Pelican generate the static site. Below are a few tests to see it works. Markdown I like Markdown. LaTex This is a try to use LaTeX in Markdown. Let us start with a simple linear model. $$y=\\beta_0+\\beta_1x_1+\\beta_2x_2+u$$ In [1]: print ( 'Hello World!' ) Hello World! In [2]: import numpy as np a = np . array ([ 1 , 2 , 3 ]) # Create a rank 1 array print ( type ( a )) # Prints \"<class 'numpy.ndarray'>\" print ( a . shape ) # Prints \"(3,)\" print ( a [ 0 ], a [ 1 ], a [ 2 ]) # Prints \"1 2 3\" a [ 0 ] = 5 # Change an element of the array print ( a ) # Prints \"[5, 2, 3]\" b = np . array ([[ 1 , 2 , 3 ],[ 4 , 5 , 6 ]]) # Create a rank 2 array print ( b . shape ) # Prints \"(2, 3)\" print ( b [ 0 , 0 ], b [ 0 , 1 ], b [ 1 , 0 ]) # Prints \"1 2 4\" <class 'numpy.ndarray'> (3,) 1 2 3 [5 2 3] (2, 3) 1 2 4","tags":"python","url":"/using-jupyter-notebook-with-pelican-in-windows.html","loc":"/using-jupyter-notebook-with-pelican-in-windows.html"},{"title":"Creating Pretty Tables in Python with PTable","text":"Creating an output table in Python using PTable is fast and easy. This article introduces the most useful functionalities of PTable, such as adding rows and columns, changing text alignment and floating number format, and clearing data, to get a quick start to make the ideal table in no time. If this is not enough, here are two detailed tutorials of PTable: http://zetcode.com/python/prettytable/ and https://github.com/jazzband/prettytable Install PTable in Terminal pip install ptable Install PTable in Jupyter kernel import sys !{ sys.executable } -m pip install ptable Create an empty table ### Import the package from prettytable import PrettyTable ### Create a table table = PrettyTable () print ( table ) # print an empty table ++ || ++ ++ Edit table by row table . field_names = [ 'column1' , 'column2' ] # add column names print ( table ) +---------+---------+ | column1 | column2 | +---------+---------+ +---------+---------+ table . add_row ([ 11 , 12 ]) # add a row table . add_row ([ 21 , 22 ]) # add another row print ( table ) +---------+---------+ | column1 | column2 | +---------+---------+ | 11 | 12 | | 21 | 22 | +---------+---------+ table . del_row ( 1 ) # delete the row with index 1 print ( table ) +---------+---------+ | column1 | column2 | +---------+---------+ | 11 | 12 | +---------+---------+ Edit table by column table . add_column ( 'column3' , [ 31.0 ]) # add a new column print ( table ) +---------+---------+---------+ | column1 | column2 | column3 | +---------+---------+---------+ | 11 | 12 | 31.0 | +---------+---------+---------+ Text alignment table . align [ 'column1' ] = 'l' # 'l', 'c', or 'r' table . align [ 'column2' ] = 'c' table . align [ 'column3' ] = 'r' print ( table ) +---------+---------+---------+ | column1 | column2 | column3 | +---------+---------+---------+ | 11 | 12 | 31.0 | +---------+---------+---------+ Floating number format table . float_format [ 'column3' ] = \"8.4\" # This is equivalent to '%8.4f' % column_value print ( table ) +---------+---------+----------+ | column1 | column2 | column3 | +---------+---------+----------+ | 11 | 12 | 31.0000 | +---------+---------+----------+ Add title print ( table . get_string ( title = \"Table Title\" )) +------------------------------+ | Table title | +---------+---------+----------+ | column1 | column2 | column3 | +---------+---------+----------+ | 11 | 12 | 31.0000 | +---------+---------+----------+ Clear data table . clear_rows () print ( table ) +---------+---------+---------+ | column1 | column2 | column3 | +---------+---------+---------+ +---------+---------+---------+","tags":"Python","url":"/creating-pretty-tables-in-python-with-ptable.html","loc":"/creating-pretty-tables-in-python-with-ptable.html"},{"title":"Learning Resources for Econometrics, Statistics and Machine Learning","text":"Over the years, I have used a number of books for Econometrics, statistics and machine learning either as a student, teaching assistant or lecturer. Even though I enjoy reading hard copies more, I am more and more inclined to have electronic copies when overall costs of carry are considered. Given that more and more electronic books can be freely accessible online, I feel that there is little incentive to have a hard copy if you do not already own one. Below is a list of openly accessible books that I find helpful especially for people interested in econometrics, statistics, and machine learning. Econometrics Econometrics Discrete Choice Methods with Simulation Statistics Computer Age Statistical Inference: Algorithms, Evidence and Data Science Estimation and Testing under Sparsity Machine Learning The Elements of Statistical Learning: Data Mining, Inference, and Prediction Statistical Learning with Sparsity: The Lasso and Generalizations An Introduction to Statistical Learning with Applications in R The books that I still keep hard copies with me are Econometric Analysis by William H. Greene, Time Series Analysis by James D. Hamilton and Introductory Econometrics by Jeffrey M. Wooldridge. The first two are great reference books for econometric theory and the last one comes very handy when looking for small economic data sets.","tags":"Econometrics","url":"/learning-resources-for-econometrics-statistics-and-machine-learning.html","loc":"/learning-resources-for-econometrics-statistics-and-machine-learning.html"},{"title":"Calculating t-statistic for OLS Regression in Python","text":"In a previous article , we calculated the OLS estimate and its variance using only the Numpy package in Python. In most cases, we would also need the t-statistic and its p-value to see if the coefficients we got are statistically significant. To achieve this, we will use SciPy , a powerful scientific computing library in Python. First, we import the class of student's t-distributed random variables from SciPy . In order to use the OLS estimate and variance estimate we calculated using NumPy . We also need to import the NumPy package. # Import SciPy and NumPy from scipy.stats import t # We only need the t class from scipy.stats import numpy as np Next, let's generate some toy data and calculate the OLS estimate and variance estimate as before. # Generate some random data n , k = 100 , 2 # set the dimensions of the design matrix beta = np . array ([ 1 , 1 , 10 ]) # set the true coefficients x = np . concatenate ([ np . ones (( n , 1 )), np . random . randn ( n , k )], axis = 1 ) # generate random x y = np . matmul ( x , beta ) + np . random . randn ( n ) # generate random y # Calculate OLS regression coefficients beta_hat = np . matmul ( np . matmul ( np . linalg . inv ( np . matmul ( np . array ( x ) . transpose (), np . array ( x ))), x . transpose ()), y ) # Calculate Variance of OLS estimate residual = y - np . matmul ( x , beta_hat ) # calculate the residual sigma_hat = sum ( residual ** 2 ) / ( n - k - 1 ) # estimate of error term variance variance_beta_hat = sigma_hat * np . linalg . inv ( np . matmul ( x . transpose (), x )) # Calculate variance of OLS estimate We can get the t-statistic by dividing an OLS estimate by its standard error like below. \\begin{equation*} t_{\\hat{\\beta}_i}=\\frac{\\hat{\\beta}_i}{\\sigma_i} \\end{equation*} # Calculate the t-statistic for each coefficient t_stat = beta_hat / np . sqrt ( variance_beta_hat . diagonal ()) t_stat array([ 10.94146498, 12.18736475, 107.65469311]) Now, let us calculate the p-value for a two-sided test for each t-statistic using the cumulative distribution function (CDF) of the student's t-distribution. # Get the p-value for each t-statistic p_value = 1 - 2 * np . abs ( 0.5 - np . vectorize ( t . cdf )( t_stat , n - k - 1 )) p_value array([0., 0., 0.]) Since all the parameters are indeed in the data generating process (DGP), the coefficients we got are super significant.","tags":"Econometrics","url":"/calculating-t-statistic-for-ols-regression-in-python.html","loc":"/calculating-t-statistic-for-ols-regression-in-python.html"},{"title":"Things One Should Know before Having a Pet Turtle","text":"I got my one-month-old red-eared turtle from PetSmart yesterday and learned a lot from the staff there. Keeping a pet turtle actually needs more work and preparation than I initially expected. Here is a summary of the things I learned and I believe everyone should know when considering having a pet turtle. A red-eared turtle and other popular turtle species can usually grow up to 12 inches and will need a water tank of at least 40 gallons (36 3/16 x 18 1/4 x 16 15/16 inches) which may take up quite some space for people living in small apartments like me. Turtles need to be exposed to enough UVB every day to stimulate the growth of their bones and shells. A wild turtle would naturally get them by basking under the sun. However, an indoor turtle would need to have a dedicated light to generate UVB for them. In winter, it is usually better to have a heat light in addition to the UVB light in order to create the suitable basking temperature for the turtles. Another essential is the water cleaner. It is used to keep the water clean and the turtle healthy. I would also recommend getting a pump or a water tank with a drain since it is necessary to change the water weekly. It is better to take these things into account when considering buying a turtle. It may be more work than expected. Luckily, it is likely that we can get all those accessories from a pet store for under 100 dollars. Lastly, a photo of my baby turtle exploring its new home.","tags":"Other","url":"/things-one-should-know-before-having-a-pet-turtle.html","loc":"/things-one-should-know-before-having-a-pet-turtle.html"},{"title":"Ordinary Least Squares Regression in Python from Scratch","text":"This article introduces how to calculate the coefficients for an Ordinary Least Squares regression in Python using only the NumPy package. NumPy is the fundamental package for scientific computing with Python. It performs in some way similar to R. First, let us import the NumPy package. # Import NumPy import numpy as np Then, let's generate some toy data to play with. # Generate some random data n , k = 100 , 2 # set the dimensions of the design matrix beta = np . array ([ 1 , 1 , 10 ]) # set the true coefficients x = np . concatenate ([ np . ones (( n , 1 )), np . random . randn ( n , k )], axis = 1 ) # generate random x y = np . matmul ( x , beta ) + np . random . randn ( n ) # generate random y OLS Estimator Now we have an \\(n \\times k\\) matrix \\(x\\) as the design matrix and an \\(n \\times 1\\) vector \\(y\\) as the vector of the endogenous variable. The OLS estimator can be calculated using the formula below: \\begin{equation*} \\hat{\\beta} = (x'x)&#94;{-1}x'y. \\end{equation*} Next, we calculate the value of the OLS estimator with the formula above using NumPy. # Calculate OLS regression coefficients beta_hat = np . matmul ( np . matmul ( np . linalg . inv ( np . matmul ( np . array ( x ) . transpose (), np . array ( x ))), x . transpose ()), y ) beta_hat array([ 1.05552416, 1.0684565 , 10.08328924]) The values of the calculated OLS coefficients using the simulated toy data are shown above. We can further develop it into a function and add other functionalities like calculating the variance of the OLS estimate. Variance of Estimator Next let us calculate the variance of the OLS estimate. From the formula of the OLS estimator above, we can derive the formula of its variance to be \\begin{equation*} Var(\\hat{\\beta})=\\sigma&#94;2(X'X)&#94;{-1}, \\end{equation*} where \\(\\sigma&#94;2\\) is the variance of the error term. We can use the sample variance of the error term \\begin{equation*} \\hat{\\sigma}&#94;2 = \\frac{\\sum\\hat{u}_i&#94;2}{n-k-1}, \\end{equation*} where \\(\\hat{u_i}\\) are the residuals from the OLS regression as an estimate of its true variance. # Calculate Variance of OLS estimate residual = y - np . matmul ( x , beta_hat ) # calculate the residual sigma_hat = sum ( residual ** 2 ) / ( n - k - 1 ) # estimate of error term variance variance_beta_hat = sigma_hat * np . linalg . inv ( np . matmul ( x . transpose (), x )) # Calculate variance of OLS estimate variance_beta_hat array([[ 0.01182717, 0.00117423, -0.00012874], [ 0.00117423, 0.01178575, 0.00108286], [-0.00012874, 0.00108286, 0.01194932]])","tags":"Econometrics","url":"/ordinary-least-squares-regression-in-python-from-scratch.html","loc":"/ordinary-least-squares-regression-in-python-from-scratch.html"},{"title":"How to Install Rpy2 in Windows 10","text":"Rpy2 is a popular Python interface to R. It allows Python users to enjoy the breadth and depth of R packages in Python. Yet, unlike in UNIX-like operating systems, it is not straightforward to install and set up rpy2 in Windows. This article shows a simple way to install the rpy2 Python interface to R on a Windows 10 machine. Download Rpy2.whl Unlike what we would usually do to install Python packages, on a Windows machine, the following command might not work as expected for rpy2 : pip install rpy2 A work around is to download rpy2 from the Unofficial Windows Binaries for Python Extension Packages to the current working directory. Then use the following command to install rpy2 from the downloaded file: pip install rpy2‑2.9.5‑cp37‑cp37m‑win32.whl Set up R_HOME and R_USER After successfully installing the package, we need to set up two environment variables in Windows before rpy2 can work properly. Right click on This PC. Then go to Properties -> Advanced System Settings -> Environment Variables. First, create a new system variable, R_HOME , which takes the path of the R installation directory as its value. For me, it looks like this. C:Program FilesRR-3.6.3 Then, create another system variable, R_USER , which takes the path of the rpy2 installation directory as its value. For me, it looks like this. F:MyProjectvenvLibsite-packagesrpy2 Note: If it still does not work properly, try creating R_USER as a user variable too. Now rpy2 should work as expected and you can start using the R packages you like.","tags":"Python","url":"/how-to-install-rpy2-in-windows-10.html","loc":"/how-to-install-rpy2-in-windows-10.html"},{"title":"在Windows10中使用Pelican和GitHub Pages建立Blog","text":"本文主要介绍如何在Windows10中使用Python的Pelican包建立静态站点，并使用Git发布至GitHub Pages。 之前找工作的时候将个人主页发布在了GitHub Pages上，感觉非常好用。 找完工作后一直希望可以重新利用GitHub Pages这项免费的服务。 现在准备使用Github Pages发布一个blog，发一点工作学习中有意思的事情。第一篇blog就介绍 一下使用GitHub Pages建立blog的方法。 首先介绍一下接下来将要用到的两个工具：Github Pages和pelican。GitHub Pages是GitHub在2008 年推出的一项静态站点托管服务。它直接从GitHub上的仓库获取HTML、CSS和JavaScript文件，通过构建过程运行文件，然后发布网站。 Pelican是Python中用来生成静态站点的package。虽然GitHub建议使用Jekyll作为静态站点生成器，而且Jekyll内置GitHub Pages支持和简化的构建流程， 但是Jekyll需要安装Ruby，作为从来没有使用过Ruby的人来说稍显复杂。而且我现在主要使用的是公司提供的笔记本电脑， 不想安装太多和工作无关的程序。现在正在进行的项目是用Python编写的，于是希望能更多的使用Python，也算是为以后的工作做准备。 废话少说，接下来我们就来介绍一下如何使用pelican制作个人blog，然后发布至Github Pages。 创建GitHub账户 要使用GitHub Pages首先需要一个可用的GitHub账户。由于我之前使用过GitHub Pages ，所以我这里直接使用我之前注册的账户。没有GitHub账户的朋友可以到Github首页按流程免费注册。注册完成后，要使用GitHub Pages，我们只需要在自己的GitHub账户下建立一个名为username.github.io的repository 。username就是你想要使用的GitHub账号的用户名。接下来我们只需要把我们做好的站点文件上传到username.github .io这个repository的master branch下，我们的网站就在username.github.io 这个域名上发布了。互联网上的所有人都可以通过在浏览器地址栏输入username.github.io 访问到我们发布的内容。更多关于GitHub Pages的介绍和使用说明可以在 GitHub Pages主页 和 GitHub Pages帮助文档 中找到，这里就不再赘述。若有什么问题也可以发邮件给我。 创建好GitHub repository之后， 在本地电脑新建一个文件夹用来存放所有和站点有关的文件。然后进入文件夹，使用Git 将GitHub云端的的repository克隆到本地。 git clone https://github.com/username/username.github.io.git 这样我们就将GitHub云端的repository和本地的文件联系在了一起。接下来我们着重介绍一下如何使用pelican建立静态站点以及如何将建立的静态站点方便快捷的发布到GitHub Pages上。 使用pelican-quickstart创建静态站点 首先使用命令行安装pelican和markdown： pip install pelican markdown ghp-import 然后使用命令行运行 pelican-quickstart 命令： pelican-quickstart 根据需要回答问题。以下是我的回答： > Where do you want to create your new web site? [.] > What will be the title of this web site? My Blog > Who will be the author of this web site? Me > What will be the default language of this web site? [English] en > Do you want to specify a URL prefix? e.g., https://example.com (Y/n) n > Do you want to enable article pagination? (Y/n) n > What is your time zone? [Europe/Paris] > Do you want to generate a tasks.py/Makefile to automate generation and publishing? (Y/n) n 需要注意的是若在Windows中使用pelican，最后一个问题推荐选No。因为Windows默认未安装Make命令，若选择是需要单独安装Make功能，而且过程并不简单。 添加内容页面 站点已经建立好了，接下来为站点添加内容。首先在站点目录下（若是使用我的回答，就是terminal的当前目录）新建 一个名为content的文件夹用来保存内容页面。 然后在content文件夹下创建新的内容页面，以md作为文件拓展名，如my-first-blog.md。 在my-first-blog.md文件中输入： Title : My First Blog Date : 2020 - 03 - 22 Category : Blog This is the first blog of my site . 在命令行中输入： pelican content pelican --listen 然后在浏览器地址栏输入localhost:8000便可以在本地电脑中看到做出的blog的效果。 发布至GitHub Pages 接下来需要将做好的静态展点发布至GitHub Pages。由于之前在创建GitHub账号的时候我们已经将云端repository和本地文件建立了联系，现在我们可以直接使用一下命令将本地文件上传至云端。 git add . # 将修改过的本地文件添加到Git目录中 git commit -a -m \"my first post\" # Commit我们所做的修改 git push -u origin pelican # 将站点的源文件上传至GitHub repository的pelican branch中 pelican content -o output -s pelicanconf.py # 使用pelican建立站点，并将编译好的站点文件存在output文件夹中 ghp-import output -r origin -b master # 将output文件夹中的文件复制到master branch git push origin master # 将master branch上传至云端 git checkout pelican # 返回pelican branch 以后每次对网站做出修改之后只需要重新执行上述命令就可以在网站上看到所做的修改。注意这里我们在GitHub上建立了两个branch，master branch用来存放编译好的站点文件，浏览器在访问我们的网站的时候也会从master branch里寻找相应的文件。pelican branch用来存放编译网站的源文件，pelican的设置文件、每一篇blog的Markdown文件等不需要浏览器看到的文件。 稍微等上几分钟，然后在浏览器中输入我们网站的地址，就可以看到刚刚发布的网站了。","tags":"Python","url":"/zai-windows10zhong-shi-yong-pelicanhe-github-pagesjian-li-blog.html","loc":"/zai-windows10zhong-shi-yong-pelicanhe-github-pagesjian-li-blog.html"}]};