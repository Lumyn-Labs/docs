# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Lumyn Labs Documentation'
copyright = '2025, Lumyn Labs'
author = 'Lumyn Labs'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
  'myst_parser',
]

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'furo'
html_theme_options = {
    "sidebar_hide_name": True,
    "source_repository": "https://github.com/Lumyn-Labs/docs/",
    "source_branch": "main",
    "source_directory": "./",
}
html_static_path = ['_static']

# GitHub Pages specific settings
html_baseurl = 'https://docs.lumynlabs.com/'

# Ensure proper navigation
html_show_sourcelink = True
html_show_sphinx = False
