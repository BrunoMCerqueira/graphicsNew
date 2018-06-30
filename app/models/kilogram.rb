class Kilogram < ApplicationRecord

  def self.lastone
    Kilogram.last
  end
end
