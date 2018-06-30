class KilogramsController < ApplicationController

  def index
    @kilograms = Kilogram.all
    @kilogram = Kilogram.new
    @last_kilo = Kilogram.lastone

    respond_to do |format|
      format.html
      format.json { render json: @kilograms }
    end

  end

  def create

    Kilogram.create(kg_params)
    @last_kilo = Kilogram.lastone
    respond_to do |format|
      format.js
    end
  end


  private

  def kg_params

    params.require(:kilogram).permit(:kg, :kg_date)
  end
end
