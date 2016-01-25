# encoding: utf-8

class CoverPhotoUploader < CarrierWave::Uploader::Base
  def store_dir
    "e/#{model.uid}/"
  end
end
