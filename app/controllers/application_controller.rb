class ApplicationController < ActionController::API
  private

  def current_user
    @user ||= begin
      token = request.headers["Authorization"].to_s.split(" ").last
      payload, header = *JSONWebToken.verify(token)
      User.from_auth_hash(payload)
    end
  rescue JWT::VerificationError, JWT::DecodeError
    nil
  end
end
