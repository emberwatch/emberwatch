module Jekyll
  module GroupByFilter
    def group_by_month(input, property)
      if groupable?(input)
        input.group_by do |item|
          time(item_property(item, property)).strftime("%B %Y")
        end.inject([]) do |memo, i|
          memo << {"name" => i.first, "items" => i.last}
        end
      else
        input
      end
    end
  end
end
Liquid::Template.register_filter(Jekyll::GroupByFilter)
