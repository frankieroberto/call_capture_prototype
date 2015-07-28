require 'rack/contrib'
require_relative 'app'

use Rack::TryStatic,
  :urls => ["/"],
  :root => "public",
  :index => 'index.html',
  :header_rules => [[:all, {'Cache-Control' => 'public, max-age=1'}]]

run CallCapturePrototype