class InquiriesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create] # Simplified for JS submission, or we can pass token

  def create
    @inquiry = Inquiry.new(inquiry_params)
    if @inquiry.save
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def inquiry_params
    params.require(:inquiry).permit(:message, :name, :email)
  end
end
