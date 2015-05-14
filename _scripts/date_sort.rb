require 'yaml'

filename = "../_data/#{ARGV[0]}.yml"
data = YAML.load(File.open(filename))
sorted_data = data.sort_by {|datum| Date.parse(datum["date"]) }.reverse
File.write(filename, sorted_data.to_yaml)
