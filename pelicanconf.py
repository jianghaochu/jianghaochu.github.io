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

from pelican_jupyter import markup as nb_markup
PLUGINS = ['i18n_subsites', 'render_math', 'more_categories', 'tipue_search', nb_markup]
IPYNB_MARKUP_USE_FIRST_CELL = True

DIRECT_TEMPLATES = (('index', 'tags', 'categories', 'authors', 'archives', 'search'))

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
LINKS = (('Email', 'mailto:jianghaochu@gmail.com'),
         )

# Social widget
SOCIAL = (('GitHub', 'https://github.com/jianghaochu'),
          ('Twitter', 'https://twitter.com/JianghaoC'),
          )

DEFAULT_PAGINATION = 8

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True