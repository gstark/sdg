if Rails.env.production?
  Rails.application.config.after_initialize do |app|
    CLIENT_HTML = File.read(Rails.root.join("public/index.html"))
    app.routes.append { match "*path", to: proc { [200, {}, [CLIENT_HTML]] }, via: [:get] }
  end
end
