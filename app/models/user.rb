class User < ApplicationRecord
  has_many :cohorts

  def self.from_auth_hash(payload)
    User.find_or_create_by(auth_sub: payload["sub"]) do |user|
      # This code will be called whenever we create a User for the first time.
      # This code would save a user's avatar as a URL
      # user.avatar_url = payload["picture"]
      # This code would attach an ActiveStorage profile image by downloading the user's profile and storing it locally
      # If you do this, you must also run `bundle add down` to add the `down` gem
      #
      # begin
      #   picture = Down.download(payload["picture"])
      #   user.profile_image.attach(io: picture, filename: picture.original_filename)
      # rescue Down::Error => exception
      #   Rails.logger.info exception
      # end

      user.email = payload["email"]
      user.name = payload["name"]
    end
  end
end
