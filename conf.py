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
  'sphinx_design',
]

# Enable MyST extensions for admonitions and enhanced Markdown
myst_enable_extensions = [
    "colon_fence",      # ::: admonitions and fenced directives
    "deflist",          # definition lists
    "attrs_block",      # block-level attributes
    "attrs_inline",     # inline attributes
    "html_admonition",  # HTML-style admonitions
    "html_image",       # allow HTML attributes on images
]

# MyST: derive document title from first H1 heading
myst_heading_to_title = True

source_suffix = {
    '.rst': 'restructuredtext',
    '.md': 'markdown',
}

templates_path = ['_templates']
exclude_patterns = ['_build', 'README.md']

# MyST configuration: enable fenced directives for toctree blocks
myst_fence_as_directive = [
    'toctree',
]

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'furo'
html_theme_options = {
    "sidebar_hide_name": True,
    "source_repository": "https://github.com/Lumyn-Labs/docs/",
    "source_branch": "main",
    "source_directory": "./",
}
html_static_path = ['_static', 'assets']
# Add our custom CSS to override theme variables
html_css_files = [
    'css/custom.css',
]
# Force dark theme only
html_js_files = [
    'js/force-dark.js',
]

# GitHub Pages specific settings
html_baseurl = 'https://docs.lumynlabs.com/'

# Ensure proper navigation
html_show_sourcelink = True
html_show_sphinx = False
