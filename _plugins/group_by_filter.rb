module Jekyll
  module GroupByFilter
    def group_by_month(input, property)
      if groupable?(input)
        input.group_by do |item|
          time(item_property(item, property)).strftime("%B %Y")
        end.inject([]) do |memo, i|
          memo << {"name" => i.first, "items" => i.last.sort_by! {|hash| hash['date']}.reverse!, "sortable_date" => time(item_property(i.last.first, property)).strftime('%Y%m')}
        end.sort_by! do |hash|
          hash["sortable_date"]
        end.reverse!
      else
        input
      end
    end
  end
end
Liquid::Template.register_filter(Jekyll::GroupByFilter)
