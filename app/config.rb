# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "scss"
css_dir = "styles"
fonts_dir = "fonts"
images_dir = "images"

# You can select your preferred output style here (can be overridden via the command line):
#output_style = :expanded or :nested or :compact or :compressed
output_style = :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass


#You must compile your sass stylesheets into CSS when they change.
#This can be done in one of the following ways:
#  1. To compile on demand:
#     compass compile [path/to/project]
#  2. To monitor your project for changes and automatically recompile:
#     compass watch [path/to/project]
