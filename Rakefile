require "bundler/setup"

def git_update
  system "git clone https://github.com/emberwatch/emberwatch.git ."
end

desc "Build the website"
task :build do
  system({"DEPLOY"=>"1"}, "middleman build")
end

desc "Deploy the website to GitHub Pages"
task :deploy, :msg do |t, args|
  puts "Message was #{args[:msg]}"
  system "rm -rf build"
  mkdir_p "build"
  Dir.chdir "build" do
    git_update

    Rake::Task["build"].invoke

    File.open("CNAME", 'w') do |f|
      f.write "emberwatch.com"
    end

    system "git add -A"
    system "git commit -m '#{args[:msg]}'"
    system "git push origin gh-pages"
  end
end
