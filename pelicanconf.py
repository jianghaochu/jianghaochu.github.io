#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Jianghao'
SITENAME = "Jianghao's blog"
SITEURL = ''

PATH = 'content'

THEME = 'theme'

MARKUP = ('md', 'ipynb')

# if you create jupyter files in the content dir, snapshots are saved with the same
# metadata. These need to be ignored.
IGNORE_FILES = [".ipynb_checkpoints"]

PLUGIN_PATHS = ['plugins/', ]

PLUGINS = ['i18n_subsites', 'render_math', 'more_categories', 'ipynb.markup', 'tipue_search']

DIRECT_TEMPLATES = (('search'))

IPYNB_USE_METACELL = True

JINJA_ENVIRONMENT = {
    'extensions': ['jinja2.ext.i18n'],
}

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('GitHub', 'https://github.com/jianghaochu'),
         ('Email', 'mailto:jianghaochu@gmail.com')
         )

# Social widget
SOCIAL = ()

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True