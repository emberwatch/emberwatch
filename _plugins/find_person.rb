module Jekyll
  class FindPerson < Liquid::Tag
    def render(context)
      person_id = @markup.strip.to_i
      site = context.registers[:site]
      site.data['people'].find do |p|
        p['id'] == person_id
      end
    end
  end
end
Liquid::Template.register_tag('find_person', Jekyll::FindPerson)
