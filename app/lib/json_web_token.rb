require "net/http"
require "uri"

class JSONWebToken
  def self.verify(token)
    JWT.decode(token, nil,
               true,
               algorithm: "RS256",
               iss: "https://gstark.auth0.com/",
               verify_iss: true) do |header|
      jwks_hash[header["kid"]]
    end
  end

  def self.jwks_hash
    jwks_raw = Net::HTTP.get URI("https://gstark.auth0.com/.well-known/jwks.json")
    jwks_keys = Array(JSON.parse(jwks_raw)["keys"])
    jwks_keys.map { |key| [key["kid"], OpenSSL::X509::Certificate.new(Base64.decode64(key["x5c"].first)).public_key] }.to_h
  end
end
